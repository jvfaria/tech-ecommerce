package common;

import com.techecommerce.main.dto.ApiResponse;
import com.techecommerce.main.dto.AuthToken;
import com.techecommerce.main.dto.LoginUserDTO;
import com.techecommerce.main.dto.UserCreateDTO;
import com.techecommerce.main.enums.RoleEnum;
import com.techecommerce.main.exceptions.EmailExistsException;
import com.techecommerce.main.models.Role;
import com.techecommerce.main.models.User;
import com.techecommerce.main.repositories.BrandRepository;
import com.techecommerce.main.repositories.RoleRepository;
import com.techecommerce.main.repositories.UserRepository;
import com.techecommerce.main.repositories.UserRoleRepository;
import com.techecommerce.main.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testcontainers.containers.PostgreSQLContainer;

import javax.sql.DataSource;
import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;

@IntegrationTest
@Slf4j
public abstract class AbstractContainerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private DataSource dataSource;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BrandRepository brandRepository;

    public static final String BASE_URL = "http://localhost:";
    public static final String USER_EMAIL_TEST = "randomemail@email.com";
    public static final String USER_NAME_TEST = "username";
    public static final String PASSWORD_TEST = "password";

    static PostgreSQLContainer<?> postgresContainer = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("techecommerce")
            .withUsername("postgres")
            .withPassword("postgres");

    @BeforeAll
    static void setUp() {
        postgresContainer.start();
        System.setProperty("spring.datasource.url", postgresContainer.getJdbcUrl());
        System.setProperty("spring.datasource.username", postgresContainer.getUsername());
        System.setProperty("spring.datasource.password", postgresContainer.getPassword());
    }

    @BeforeEach
    void initSqlCreateDefaultRoles() {
        userRoleRepository.deleteAll();
        userRepository.deleteAll();
        roleRepository.deleteAll();
        brandRepository.deleteAll();

        Role superAdmin = new Role();
        superAdmin.setName(RoleEnum.SUPER_ADMIN.getRoleName());
        roleRepository.save(superAdmin);

        Role userRole = new Role();
        userRole.setName(RoleEnum.USER.getRoleName());
        roleRepository.save(userRole);
    }

    protected String createUrlRequest(String uri) {
        return BASE_URL + port + "/api/v1" + uri;
    }

    public String authenticate(RoleEnum userType) {
        LoginUserDTO loginUserDTO = null;
        if(RoleEnum.SUPER_ADMIN.equals(userType)) {
            loginUserDTO = new LoginUserDTO(USER_EMAIL_TEST, PASSWORD_TEST);
        } else {
            loginUserDTO = new LoginUserDTO(USER_EMAIL_TEST, PASSWORD_TEST);
        }

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<LoginUserDTO> request = new HttpEntity<>(loginUserDTO, headers);

        ResponseEntity<ApiResponse<AuthToken>> response = restTemplate.exchange(
                createUrlRequest("/auth"),
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<ApiResponse<AuthToken>>() {}
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        return Objects.requireNonNull(response.getBody()).getData().getToken();
    }


    protected void createSuperAdminUser() {
        var newUser = new UserCreateDTO();
        newUser.setEmail(USER_EMAIL_TEST);
        newUser.setUsername(USER_NAME_TEST);
        newUser.setPassword(PASSWORD_TEST);
        User user = null;

        try {
            user = userService.createSuperAdminUser(newUser);
            assertThat(user).isNotNull();
        } catch (EmailExistsException e) {
            log.info("Test failed because tried to create user with existing email");
        }
        assertThat(user).isNotNull();
    }

    protected void createCommonUser() {
        var newUser = new UserCreateDTO();
        newUser.setEmail(USER_EMAIL_TEST);
        newUser.setUsername(USER_NAME_TEST);
        newUser.setPassword(PASSWORD_TEST);
        User user = null;

        try {
            user = userService.create(newUser);
        } catch (EmailExistsException e) {
            log.info("Test failed because tried to create user with existing email");
        }

        assertThat(user).isNotNull();
    }


}
