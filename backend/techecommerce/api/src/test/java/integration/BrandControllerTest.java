package integration;

import com.techecommerce.main.dto.BrandDTO;
import com.techecommerce.main.dto.UserCreateDTO;
import com.techecommerce.main.exceptions.EmailExistsException;
import com.techecommerce.main.models.User;
import com.techecommerce.main.services.UserService;
import common.AbstractContainerTest;
import common.IntegrationTest;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;

@IntegrationTest
@Slf4j
public class BrandControllerTest extends AbstractContainerTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserService userService;

    public static final String NEW_BRAND_NAME_TEST = "NEW_BRAND_NAME";

    @Test
    void shouldCreateNewBrandAsSuperAdmin() {
        String token = authenticateAsSuperAdmin(createSuperAdminUser());
        BrandDTO brandDTO = buildNewBrandRequestDTO();

        HttpHeaders headers = new HttpHeaders();
        headers.add("ContentType", "application/json");
        headers.set("Authorization", "Bearer " + token);

        HttpEntity<BrandDTO> request = new HttpEntity<>(brandDTO, headers);

        ResponseEntity<BrandDTO> response = restTemplate.exchange(
                createUrlRequest("/brands"),
                HttpMethod.POST,
                request,
                BrandDTO.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(Objects.requireNonNull(response.getBody()).getId()).isNotNull();
        assertThat(response.getBody().getName()).isEqualTo(NEW_BRAND_NAME_TEST);
    }

    private BrandDTO buildNewBrandRequestDTO() {
        return new BrandDTO(null, NEW_BRAND_NAME_TEST);
    }

    public User createSuperAdminUser() {
        var newUser = new UserCreateDTO();
        newUser.setEmail(SUPER_USER_EMAIL_TEST);
        newUser.setUsername(SUPER_USER_NAME_TEST);
        newUser.setPassword(SUPER_PASSWORD_TEST);

        User user = null;

        try {
            user = userService.createSuperAdminUser(newUser);
            assertThat(user).isNotNull();
        } catch (EmailExistsException e) {
            log.info("Test failed because tried to create user with existing email");
        }

        return user;
    }
}
