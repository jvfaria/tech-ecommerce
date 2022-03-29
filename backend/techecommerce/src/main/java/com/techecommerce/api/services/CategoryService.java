package com.techecommerce.api.services;

import com.techecommerce.api.dtos.CategoryDTO;
import com.techecommerce.api.exceptions.CategoryNameExistsException;
import com.techecommerce.api.exceptions.ResourceNotFoundException;
import com.techecommerce.api.models.Category;
import com.techecommerce.api.repositories.CategoryRepository;
import com.techecommerce.api.transformers.CategoryTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryTransformer categoryTransformer;

    public Category create(CategoryDTO categoryDTO) throws CategoryNameExistsException {
        if(categoryRepository.existsByName(categoryDTO.getName().toUpperCase(Locale.ROOT))) {
            throw new CategoryNameExistsException("Category name already exists, duplicated names not allowed");
        }
        var category = categoryTransformer.toEntity(categoryDTO);
        category.setName(category.getName().toUpperCase(Locale.ROOT));
        return categoryRepository.save(category);
    }

    public Category update(CategoryDTO categoryDTO) throws CategoryNameExistsException, ResourceNotFoundException {
        if(categoryRepository.existsByName(categoryDTO.getName())) {
            throw new CategoryNameExistsException("Existent Category record with same name, duplicated names not allowed");
        }

        var existentCategory = categoryRepository.findById(categoryDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid category id, entity not found"));

        BeanUtils.copyProperties(categoryDTO, existentCategory);
        return categoryRepository.save(existentCategory);
    }

    public void delete(UUID id) throws ResourceNotFoundException {
        if(!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category ID not found: " + id);
        }

        categoryRepository.deleteById(id);
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(UUID id) throws ResourceNotFoundException {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }
    public Category findByName(String name) throws ResourceNotFoundException {
        return categoryRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }
}
