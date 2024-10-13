package integration;


import com.techecommerce.main.dtos.AuthToken;
import com.techecommerce.main.dtos.LoginUserDTO;
import com.techecommerce.main.dtos.UserCreateDTO;
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

import static org.assertj.core.api.Assertions.assertThat;

@Slf4j
@IntegrationTest
public class AuthControllerTest extends AbstractContainerTest {
    public static final String USER_EMAIL_TEST = "randomemail@email.com";
    public static final String USER_NAME_TEST = "username";
    public static final String PASSWORD_TEST = "password";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserService userService;

    @Test
    void shouldGenerateJwtToken() {
        createNewUser();
        LoginUserDTO loginUserDTO = buildLoginUserDTO();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<LoginUserDTO> request = new HttpEntity<>(loginUserDTO, headers);

        ResponseEntity<AuthToken> response = restTemplate.exchange(
                createUrlRequest("/auth"),
                HttpMethod.POST,
                request,
                AuthToken.class
        );

        AuthToken bodyResponse = response.getBody();

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(bodyResponse).isNotNull();
        assertThat(bodyResponse).isInstanceOf(AuthToken.class);
        assertThat(bodyResponse.getUsername()).isEqualTo(USER_NAME_TEST.toUpperCase());
        assertThat(bodyResponse.getToken()).isNotEmpty();

        assertThat(bodyResponse.getToken()).matches("^[A-Za-z0-9-_.]+\\.[A-Za-z0-9-_.]+\\.[A-Za-z0-9-_.]+$");
    }

    private void createNewUser() {
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

    public LoginUserDTO buildLoginUserDTO() {
        return new LoginUserDTO(USER_EMAIL_TEST, PASSWORD_TEST);
    }
}
