package integration;

import com.techecommerce.main.dto.ApiResponse;
import com.techecommerce.main.dto.CategoryDTO;
import com.techecommerce.main.enums.RoleEnum;
import com.techecommerce.main.exceptions.CategoryNameExistsException;
import com.techecommerce.main.exceptions.ErrorDetails;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.services.CategoryService;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Fail.fail;

@IntegrationTest
public class CategoryControllerTest extends AbstractContainerTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private CategoryService categoryService;

    public static final String NEW_CATEGORY_NAME_TEST = "NEW_CATEGORY_NAME";

    @Test
    void shouldListAllCategories() throws CategoryNameExistsException, ResourceNotFoundException {
        createCommonUser();
        String token = authenticate(RoleEnum.USER);
        CategoryDTO firstCategoryDTO = buildNewCategoryRequestDTO("NEW CATEGORY 1");
        CategoryDTO secondCategoryDTO = buildNewCategoryRequestDTO("NEW CATEGORY 2");

        categoryService.create(firstCategoryDTO);
        categoryService.create(secondCategoryDTO);

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<CategoryDTO> request = new HttpEntity<>(null, headers);

        ResponseEntity<ApiResponse<List<CategoryDTO>>> getResponse = restTemplate.exchange(
                createUrlRequest("/categories"),
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {
                });

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getResponse.getBody()).isNotNull();
        assertThat(getResponse.getBody().getData()).isNotEmpty();
        assertThat(getResponse.getBody().getData()).hasSize(2);
        assertThat(getResponse.getBody().getData().get(0).getName()).isEqualTo(firstCategoryDTO.getName());
        assertThat(getResponse.getBody().getData().get(1).getName()).isEqualTo(secondCategoryDTO.getName());
    }

    @Test
    void shouldFindCategoryById() throws CategoryNameExistsException, ResourceNotFoundException {
        createSuperAdminUser();
        String token = authenticate(RoleEnum.USER);

        CategoryDTO createCategoryDTO = buildNewCategoryRequestDTO("NEW CATEGORY");
        CategoryDTO createdCategoryResponse = categoryService.create(createCategoryDTO);

        UUID createdCategoryId = createdCategoryResponse.getId();

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<CategoryDTO> request = new HttpEntity<>(null, headers);

        ResponseEntity<ApiResponse<CategoryDTO>> getResponse = restTemplate.exchange(
                createUrlRequest("/categories/" + createdCategoryId),
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {
                });

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getResponse.getBody()).isNotNull();
        assertThat(getResponse.getBody().getData()).isNotNull();
        assertThat(getResponse.getBody().getData().getId()).isEqualTo(createdCategoryId);
        assertThat(getResponse.getBody().getData().getName()).isEqualTo(createCategoryDTO.getName());
    }

    @Test
    void shouldCreateNewCategoryAsSuperAdmin() {
        createSuperAdminUser();
        String token = authenticate(RoleEnum.SUPER_ADMIN);
        CategoryDTO categoryDTO = buildNewCategoryRequestDTO(NEW_CATEGORY_NAME_TEST);

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<CategoryDTO> request = new HttpEntity<>(categoryDTO, headers);

        ResponseEntity<ApiResponse<CategoryDTO>> response = restTemplate.exchange(
                createUrlRequest("/categories"),
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<ApiResponse<CategoryDTO>>() {
                }
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(Objects.requireNonNull(response.getBody()).getData().getId()).isNotNull();
        assertThat(response.getBody().getData().getName()).isEqualTo(NEW_CATEGORY_NAME_TEST);
    }

    @Test
    @Disabled
    void shouldNotCreateNewCategoryAsCommonUser() {
        createCommonUser();
        String token = authenticate(RoleEnum.USER);
        CategoryDTO categoryDTO = buildNewCategoryRequestDTO(NEW_CATEGORY_NAME_TEST);

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<CategoryDTO> request = new HttpEntity<>(categoryDTO, headers);
        try {
            ResponseEntity<ApiResponse<ErrorDetails>> response = restTemplate.exchange(
                    createUrlRequest("/categories"),
                    HttpMethod.POST,
                    request,
                    new ParameterizedTypeReference<ApiResponse<ErrorDetails>>() {
                    }
            );

            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
            assertThat(response.getBody()).isNotNull();

        } catch (Exception e) {
        }
    }

    @Test
    void shouldUpdateCategoryNameAsSuperUser() throws CategoryNameExistsException, ResourceNotFoundException {
        createSuperAdminUser();
        String token = authenticate(RoleEnum.SUPER_ADMIN);

        CategoryDTO createCategoryDTO = buildNewCategoryRequestDTO(NEW_CATEGORY_NAME_TEST);
        categoryService.create(createCategoryDTO);
        ResponseEntity<ApiResponse<CategoryDTO>> createdCategory = categoryService.findByName(createCategoryDTO.getName());
        CategoryDTO updateCategoryRequest = Objects.requireNonNull(createdCategory.getBody()).getData();

        updateCategoryRequest.setName("UPDATED_CATEGORY");
        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<CategoryDTO> request = new HttpEntity<>(updateCategoryRequest, headers);

        ResponseEntity<ApiResponse<Object>> response = restTemplate.exchange(
                createUrlRequest("/categories"),
                HttpMethod.PUT,
                request,
                new ParameterizedTypeReference<ApiResponse<Object>>() {
                }
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();

        Object responseData = response.getBody().getData();
        if (responseData instanceof CategoryDTO) {
            assertThat(((CategoryDTO) responseData).getName()).isEqualTo(updateCategoryRequest.getName());
        } else if (responseData instanceof ErrorDetails) {
            fail("Expected CategoryDTO but received error: " + ((ErrorDetails) responseData).getMessage());
        }

        ResponseEntity<ApiResponse<CategoryDTO>> updatedCategory = categoryService.findByName(updateCategoryRequest.getName());
        assertThat(updatedCategory).isNotNull();
        assertThat(Objects.requireNonNull(updatedCategory.getBody()).getData().getName()).isEqualTo(updateCategoryRequest.getName());
    }

    @Test
    void shouldDeleteCategoryAsSuperUser() throws CategoryNameExistsException, ResourceNotFoundException {
        createSuperAdminUser();
        String token = authenticate(RoleEnum.SUPER_ADMIN);

        CategoryDTO newCategory = buildNewCategoryRequestDTO(NEW_CATEGORY_NAME_TEST);
        CategoryDTO createdCategory = categoryService.create(newCategory);

        HttpHeaders headers = buildHeaders(MediaType.APPLICATION_JSON, token);
        HttpEntity<CategoryDTO> request = new HttpEntity<>(null, headers);

        ResponseEntity<ApiResponse<Void>> deleteResponse = restTemplate.exchange(
                createUrlRequest("/categories/".concat(createdCategory.getId().toString())),
                HttpMethod.DELETE,
                request,
                new ParameterizedTypeReference<>() {
                });

        assertThat(deleteResponse.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

        ResponseEntity<ApiResponse<List<CategoryDTO>>> getResponse = restTemplate.exchange(
                createUrlRequest("/categories"),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {
                });

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    private static @NotNull HttpHeaders buildHeaders(MediaType contentType, String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(contentType);
        headers.setBearerAuth(token);
        return headers;
    }

    private CategoryDTO buildNewCategoryRequestDTO(String name) {
        return new CategoryDTO(null, name);
    }
}
