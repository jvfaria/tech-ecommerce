package common;

import com.techecommerce.main.RoleEnum;
import com.techecommerce.main.dtos.AuthToken;
import com.techecommerce.main.dtos.LoginUserDTO;
import com.techecommerce.main.models.Role;
import com.techecommerce.main.models.User;
import com.techecommerce.main.repositories.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testcontainers.containers.PostgreSQLContainer;

import javax.sql.DataSource;

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

    public static final String BASE_URL = "http://localhost:";
    public static final String SUPER_USER_EMAIL_TEST = "randomemail@email.com";
    public static final String SUPER_USER_NAME_TEST = "username";
    public static final String SUPER_PASSWORD_TEST = "password";

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

    public String authenticateAsSuperAdmin(User user) {
        LoginUserDTO loginUserDTO = new LoginUserDTO(user.getEmail(), user.getPassword());
        HttpEntity<LoginUserDTO> request = new HttpEntity<>(loginUserDTO);
        ResponseEntity<AuthToken> response = restTemplate.exchange(
                createUrlRequest("/auth"),
                HttpMethod.POST,
                request,
                AuthToken.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        return response.getBody().getToken();
    }
}
