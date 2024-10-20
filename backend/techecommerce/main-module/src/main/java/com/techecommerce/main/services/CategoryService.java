package com.techecommerce.main.services;

import com.techecommerce.main.dto.ApiResponse;
import com.techecommerce.main.dto.CategoryDTO;
import com.techecommerce.main.exceptions.CategoryNameExistsException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.Category;
import com.techecommerce.main.repositories.CategoryRepository;
import com.techecommerce.main.transformers.CategoryTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryTransformer categoryTransformer;

    public CategoryDTO create(CategoryDTO categoryDTO) throws CategoryNameExistsException, ResourceNotFoundException {
        validateCategory(categoryDTO);
        var category = categoryTransformer.toEntity(categoryDTO);
        category.setName(category.getName().toUpperCase(Locale.ROOT));
        return categoryTransformer.toDTO(categoryRepository.save(category));
    }

    public CategoryDTO update(CategoryDTO categoryDTO) throws CategoryNameExistsException, ResourceNotFoundException {
        validateCategory(categoryDTO);

        var existentCategory = categoryRepository.findById(categoryDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid category id, entity not found"));

        BeanUtils.copyProperties(categoryDTO, existentCategory);
        return categoryTransformer.toDTO(categoryRepository.save(existentCategory));
    }

    private void validateCategory(CategoryDTO categoryDTO) throws CategoryNameExistsException {
        var categoryExists = categoryRepository.existsByName(categoryDTO.getName().toUpperCase(Locale.ROOT));
        if (categoryExists) {
            throw new CategoryNameExistsException("Category name already exists, duplicated names not allowed");
        }
    }

    public void delete(UUID id) throws ResourceNotFoundException {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category ID not found: " + id);
        }

        categoryRepository.deleteById(id);
    }

    public ResponseEntity<ApiResponse<List<CategoryDTO>>> listAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        if (categories.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(HttpStatus.NOT_FOUND.name(), "No categories found"));
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(categoryTransformer.toDTO(categories)));
    }

    public ResponseEntity<ApiResponse<CategoryDTO>> findById(String id) throws ResourceNotFoundException {
        var existentCategory = categoryRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(categoryTransformer.toDTO(existentCategory)));
    }

    public ResponseEntity<ApiResponse<CategoryDTO>> findByName(String name) throws ResourceNotFoundException {
        Category category = categoryRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(categoryTransformer.toDTO(category)));
    }
}
