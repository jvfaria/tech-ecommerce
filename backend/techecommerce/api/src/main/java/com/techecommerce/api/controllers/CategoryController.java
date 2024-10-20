package com.techecommerce.api.controllers;

import com.techecommerce.main.dto.ApiResponse;
import com.techecommerce.main.dto.CategoryDTO;
import com.techecommerce.main.exceptions.CategoryNameExistsException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.Brand;
import com.techecommerce.main.models.Category;
import com.techecommerce.main.services.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Create a new category")
    @PostMapping
    public ResponseEntity<ApiResponse<CategoryDTO>> createCategory(@RequestBody CategoryDTO categoryDTO) throws CategoryNameExistsException, ResourceNotFoundException {
        CategoryDTO createdCategory = categoryService.create(categoryDTO);
        URI location = URI.create(String.format("categories/%s", createdCategory.getId()));
        return ResponseEntity.created(location).body(new ApiResponse<>(createdCategory));
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Update category's name")
    @PutMapping
    public ResponseEntity<ApiResponse<CategoryDTO>> updateCategory(@RequestBody CategoryDTO categoryDTO) throws CategoryNameExistsException, ResourceNotFoundException {
        CategoryDTO updatedCategory = categoryService.update(categoryDTO);

        ApiResponse<CategoryDTO> apiResponse = ApiResponse
                .<CategoryDTO>builder().data(updatedCategory).error(null).message(null).build();

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Delete a category")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable UUID id) throws ResourceNotFoundException {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("permitAll()")
    @Operation(summary = "List all categories")
    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryDTO>>> findAllCategories() {
        return categoryService.listAllCategories();
    }

    @PreAuthorize("permitAll()")
    @Operation(summary = "Find category by id")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryDTO>> findById(@PathVariable String id) throws ResourceNotFoundException {
        return categoryService.findById(id);
    }

    @PreAuthorize("permitAll()")
    @Operation(summary = "Find category by name")
    @GetMapping("/name/{name}")
    public ResponseEntity<ApiResponse<CategoryDTO>> findByName(@PathVariable String name) throws ResourceNotFoundException {
        return categoryService.findByName(name);
    }
}
