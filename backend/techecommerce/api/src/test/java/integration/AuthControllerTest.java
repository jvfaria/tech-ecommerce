package integration;


import com.techecommerce.main.dto.ApiResponse;
import com.techecommerce.main.dto.AuthToken;
import com.techecommerce.main.dto.LoginUserDTO;
import common.AbstractContainerTest;
import common.IntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;

@IntegrationTest
public class AuthControllerTest extends AbstractContainerTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldGenerateJwtTokenAsCommonUser() {
        createCommonUser();
        LoginUserDTO loginUserDTO = buildLoginUserDTO();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<LoginUserDTO> request = new HttpEntity<>(loginUserDTO, headers);

        ResponseEntity<ApiResponse<AuthToken>> response = restTemplate.exchange(
                createUrlRequest("/auth"),
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<ApiResponse<AuthToken>>() {}
        );

        AuthToken bodyResponse = Objects.requireNonNull(response.getBody()).getData();

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(bodyResponse).isNotNull();
        assertThat(bodyResponse).isInstanceOf(AuthToken.class);
        assertThat(bodyResponse.getUsername()).isEqualTo(USER_NAME_TEST.toUpperCase());
        assertThat(bodyResponse.getToken()).isNotEmpty();
        assertThat(bodyResponse.getToken()).isNotEmpty();

        assertThat(bodyResponse.getToken()).matches("^[A-Za-z0-9-_.]+\\.[A-Za-z0-9-_.]+\\.[A-Za-z0-9-_.]+$");
    }

    @Test
    void shouldGenerateJwtTokenAsSuperAdminUser() {
        createSuperAdminUser();
        LoginUserDTO loginUserDTO = buildLoginUserDTO();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<LoginUserDTO> request = new HttpEntity<>(loginUserDTO, headers);

        ResponseEntity<ApiResponse<AuthToken>> response = restTemplate.exchange(
                createUrlRequest("/auth"),
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<ApiResponse<AuthToken>>() {}
        );

        AuthToken bodyResponse = Objects.requireNonNull(response.getBody()).getData();

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(bodyResponse).isNotNull();
        assertThat(bodyResponse).isInstanceOf(AuthToken.class);
        assertThat(bodyResponse.getUsername()).isEqualTo(USER_NAME_TEST.toUpperCase());
        assertThat(bodyResponse.getToken()).isNotEmpty();

        assertThat(bodyResponse.getToken()).matches("^[A-Za-z0-9-_.]+\\.[A-Za-z0-9-_.]+\\.[A-Za-z0-9-_.]+$");
    }



    public LoginUserDTO buildLoginUserDTO() {
        return new LoginUserDTO(USER_EMAIL_TEST, PASSWORD_TEST);
    }
}
