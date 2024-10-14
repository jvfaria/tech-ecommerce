package com.techecommerce.api.controllers;

import com.techecommerce.main.dto.CategoryDTO;
import com.techecommerce.main.exceptions.CategoryNameExistsException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.Category;
import com.techecommerce.main.services.CategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@Api(tags = "Category")
public class CategoryController {
    private final CategoryService categoryService;

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Create a new category")
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO categoryDTO) throws CategoryNameExistsException {
        Category createdCategory = categoryService.create(categoryDTO);
        URI location = URI.create(String.format("categories/%s", categoryDTO.getId()));
        return ResponseEntity.created(location).body(createdCategory);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Update category's name")
    @PutMapping
    public ResponseEntity<Category> updateCategory(@RequestBody CategoryDTO categoryDTO) throws CategoryNameExistsException, ResourceNotFoundException {
        return new ResponseEntity<>(categoryService.update(categoryDTO), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Delete a category")
    @DeleteMapping("/{id}")
    public ResponseEntity<Category> deleteCategory(@PathVariable UUID id) throws ResourceNotFoundException {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("permitAll()")
    @ApiOperation("List all categories")
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> findAllCategories() {
        return ResponseEntity.ok().body(categoryService.findAll());
    }

    @PreAuthorize("permitAll()")
    @ApiOperation("Find category by id")
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> findById(@PathVariable String id) throws ResourceNotFoundException {
        return ResponseEntity.ok().body(categoryService.findById(id));
    }

//    @PreAuthorize("permitAll()")
//    @ApiOperation("Find category by name")
//    @GetMapping("/{name}")
//    public ResponseEntity<Category> findByName(@PathVariable String name) throws ResourceNotFoundException {
//        return new ResponseEntity<>(categoryService.findByName(name), HttpStatus.OK);
//    }
}
