package integration;

import com.techecommerce.main.dto.ApiResponse;
import com.techecommerce.main.dto.BrandDTO;
import com.techecommerce.main.enums.RoleEnum;
import com.techecommerce.main.exceptions.BrandNameExistsException;
import com.techecommerce.main.exceptions.ErrorDetails;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.services.BrandService;
import com.techecommerce.main.transformers.BrandTransformer;
import common.AbstractContainerTest;
import common.IntegrationTest;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Fail.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;

@IntegrationTest
public class BrandControllerTest extends AbstractContainerTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    BrandService brandService;

    @Autowired
    BrandTransformer transformer;

    public static final String NEW_BRAND_NAME_TEST = "NEW_BRAND_NAME";

    @Test
    void shouldListAllBrands() throws BrandNameExistsException, ResourceNotFoundException {
        createSuperAdminUser();
        String token = authenticate(RoleEnum.USER);
        BrandDTO firstCreateBrandDTO = buildNewBrandRequestDTO("NEW BRAND 1");
        BrandDTO secondCreateBrandDTO = buildNewBrandRequestDTO("NEW BRAND 2");

        brandService.create(firstCreateBrandDTO);
        brandService.create(secondCreateBrandDTO);

        ResponseEntity<ApiResponse<BrandDTO>> firstCreatedBrand = brandService.findByName(firstCreateBrandDTO.getName());
        assertThat(Objects.requireNonNull(firstCreatedBrand.getBody()).getData().getName()).isEqualTo(firstCreateBrandDTO.getName());

        ResponseEntity<ApiResponse<BrandDTO>> secondCreatedBrand = brandService.findByName(secondCreateBrandDTO.getName());
        assertThat(Objects.requireNonNull(secondCreatedBrand.getBody()).getData().getName()).isEqualTo(secondCreateBrandDTO.getName());

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<BrandDTO> request = new HttpEntity<>(null, headers);

        ResponseEntity<ApiResponse<List<BrandDTO>>> getResponse = restTemplate.exchange(
                createUrlRequest("/brands"),
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {
                });

        assertEquals(Objects.requireNonNull(getResponse.getStatusCode()), HttpStatus.OK);

        assertThat(getResponse.getBody()).isNotNull();
        assertThat(getResponse.getBody().getData()).isNotEmpty();

        assertThat(getResponse.getBody().getData()).hasSize(2);
        assertThat(getResponse.getBody().getData().get(0)).usingRecursiveComparison().isEqualTo(firstCreatedBrand.getBody().getData());
        assertThat(getResponse.getBody().getData().get(1)).usingRecursiveComparison().isEqualTo(secondCreatedBrand.getBody().getData());

        assertThat(getResponse.getBody().getData().get(0).getName()).isEqualTo(firstCreatedBrand.getBody().getData().getName());
        assertThat(getResponse.getBody().getData().get(1).getName()).isEqualTo(secondCreatedBrand.getBody().getData().getName());
    }

    @Test
    void shouldFindBrandById() throws BrandNameExistsException, ResourceNotFoundException {
        createSuperAdminUser();
        String token = authenticate(RoleEnum.USER);

        BrandDTO createBrandDTO = buildNewBrandRequestDTO("NEW BRAND");
        BrandDTO createdBrandResponse = brandService.create(createBrandDTO);

        UUID createdBrandId = createdBrandResponse.getId();

        assertThat(createdBrandResponse.getName()).isEqualTo(createBrandDTO.getName());

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<BrandDTO> request = new HttpEntity<>(null, headers);

        ResponseEntity<ApiResponse<BrandDTO>> getResponse = restTemplate.exchange(
                createUrlRequest("/brands/id/" + createdBrandId),
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {
                });

        assertEquals(HttpStatus.OK, getResponse.getStatusCode());

        assertThat(getResponse.getBody()).isNotNull();
        assertThat(getResponse.getBody().getData()).isNotNull();

        assertThat(getResponse.getBody().getData().getId()).isEqualTo(createdBrandId);
        assertThat(getResponse.getBody().getData().getName()).isEqualTo(createBrandDTO.getName());
    }

    @Test
    void shouldFindBrandByName() throws BrandNameExistsException, ResourceNotFoundException {
        createSuperAdminUser();
        String token = authenticate(RoleEnum.USER);

        BrandDTO createBrandDTO = buildNewBrandRequestDTO("NEW BRAND");
        BrandDTO createdBrandResponse = brandService.create(createBrandDTO);

        String createdBrandName = createdBrandResponse.getName();

        assertThat(createdBrandResponse.getName()).isEqualTo(createBrandDTO.getName());

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<BrandDTO> request = new HttpEntity<>(null, headers);

        ResponseEntity<ApiResponse<BrandDTO>> getResponse = restTemplate.exchange(
                createUrlRequest("/brands/name/" + createdBrandName),
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {
                });

        assertEquals(HttpStatus.OK, getResponse.getStatusCode());

        assertThat(getResponse.getBody()).isNotNull();
        assertThat(getResponse.getBody().getData()).isNotNull();

        assertThat(getResponse.getBody().getData().getName()).isEqualTo(createdBrandName);
        assertThat(getResponse.getBody().getData().getName()).isEqualTo(createBrandDTO.getName());
    }

    @Test
    void shouldCreateNewBrandAsSuperAdmin() {
        createSuperAdminUser();
        String token = authenticate(RoleEnum.SUPER_ADMIN);
        BrandDTO brandDTO = buildNewBrandRequestDTO(NEW_BRAND_NAME_TEST);

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<BrandDTO> request = new HttpEntity<>(brandDTO, headers);

        ResponseEntity<ApiResponse<BrandDTO>> response = restTemplate.exchange(
                createUrlRequest("/brands"),
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<ApiResponse<BrandDTO>>() {}
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(Objects.requireNonNull(response.getBody()).getData().getId()).isNotNull();
        assertThat(response.getBody().getData().getName()).isEqualTo(NEW_BRAND_NAME_TEST);
    }

    @Test
    @Disabled
    void shouldNotCreateNewBrandAsCommonUser() {
        createCommonUser();
        String token = authenticate(RoleEnum.USER);
        BrandDTO brandDTO = buildNewBrandRequestDTO(NEW_BRAND_NAME_TEST);

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<BrandDTO> request = new HttpEntity<>(brandDTO, headers);
        try {
            ResponseEntity<ApiResponse<ErrorDetails>> response = restTemplate.exchange(
                    createUrlRequest("/brands"),
                    HttpMethod.POST,
                    request,
                    new ParameterizedTypeReference<ApiResponse<ErrorDetails>>() {}
            );

            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
            assertThat(response.getBody()).isNotNull();

        } catch (Exception e) {

        }
    }

    @Test
    void shouldUpdateBrandNameAsSuperUser() throws BrandNameExistsException, ResourceNotFoundException {
        createSuperAdminUser();
        String token = authenticate(RoleEnum.SUPER_ADMIN);

        BrandDTO createBrandDTO = buildNewBrandRequestDTO(NEW_BRAND_NAME_TEST);

        brandService.create(createBrandDTO);
        ResponseEntity<ApiResponse<BrandDTO>> createdBrand = brandService.findByName(createBrandDTO.getName());
        BrandDTO updateBrandRequest = Objects.requireNonNull(createdBrand.getBody()).getData();

        assertThat(updateBrandRequest.getName()).isEqualTo(createBrandDTO.getName());

        // Prepare request for updating brand
        updateBrandRequest.setName("UPDATED_BRAND");
        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<BrandDTO> request = new HttpEntity<>(updateBrandRequest, headers);

        ResponseEntity<ApiResponse<Object>> response = restTemplate.exchange(
                createUrlRequest("/brands"),
                HttpMethod.PUT,
                request,
                new ParameterizedTypeReference<ApiResponse<Object>>() {}
        );

        // Validate response
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();

        // Handle response type
        Object responseData = response.getBody().getData();
        if (responseData instanceof BrandDTO) {
            assertThat(((BrandDTO) responseData).getName()).isEqualTo(updateBrandRequest.getName());
        } else if (responseData instanceof ErrorDetails) {
            fail("Expected BrandDTO but received error: " + ((ErrorDetails) responseData).getMessage());
        }

        // Verify the brand was updated in the database
        ResponseEntity<ApiResponse<BrandDTO>> updatedBrand = brandService.findByName(updateBrandRequest.getName());
        assertThat(updatedBrand).isNotNull();
        assertThat(Objects.requireNonNull(updatedBrand.getBody()).getData().getName()).isEqualTo(updateBrandRequest.getName());
    }

    @Test
    void shouldDeleteBrandAsSuperUser() throws BrandNameExistsException, ResourceNotFoundException {
        createSuperAdminUser();
        String token = authenticate(RoleEnum.SUPER_ADMIN);

        BrandDTO newBrand = buildNewBrandRequestDTO(NEW_BRAND_NAME_TEST);

        BrandDTO createdBrand = brandService.create(newBrand);

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<BrandDTO> request = new HttpEntity<>(null, headers);

        ResponseEntity<ResponseEntity<ApiResponse<Void>>> deleteResponse = restTemplate.exchange(
                createUrlRequest("/brands/".concat(createdBrand.getId().toString())),
                HttpMethod.DELETE,
                request,
                new ParameterizedTypeReference<>() {
                });

        assertEquals(Objects.requireNonNull(deleteResponse.getStatusCode()), HttpStatus.NO_CONTENT);

        ResponseEntity<ApiResponse<List<BrandDTO>>> getResponse = restTemplate.exchange(
                createUrlRequest("/brands"),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {
                });

        assertEquals(Objects.requireNonNull(getResponse.getStatusCode()), HttpStatus.NOT_FOUND);
    }

    private static @NotNull HttpHeaders buildHeaders(MediaType contentType, String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(contentType);
        headers.setBearerAuth(token);
        return headers;
    }


    private BrandDTO buildNewBrandRequestDTO(String name) {
        return new BrandDTO(null, name);
    }
}
