package com.techecommerce.api.services;

import com.techecommerce.api.dtos.BrandDTO;
import com.techecommerce.api.dtos.CategoryDTO;
import com.techecommerce.api.exceptions.BrandNameExistsException;
import com.techecommerce.api.exceptions.CategoryNameExistsException;
import com.techecommerce.api.exceptions.ResourceNotFoundException;
import com.techecommerce.api.models.Brand;
import com.techecommerce.api.models.Category;
import com.techecommerce.api.repositories.BrandRepository;
import com.techecommerce.api.repositories.CategoryRepository;
import com.techecommerce.api.transformers.BrandTransformer;
import com.techecommerce.api.transformers.CategoryTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;
    private final BrandTransformer brandTransformer;

    public Brand create(BrandDTO brandDTO) throws BrandNameExistsException {
        if(brandRepository.existsByName(brandDTO.getName().toUpperCase(Locale.ROOT))) {
            throw new BrandNameExistsException("Brand name already exists, duplicated names not allowed");
        }
        var category = brandTransformer.toEntity(brandDTO);
        category.setName(category.getName().toUpperCase(Locale.ROOT));
        return brandRepository.save(category);
    }

    public Brand update(BrandDTO brandDTO) throws BrandNameExistsException, ResourceNotFoundException {
        if(brandRepository.existsByName(brandDTO.getName())) {
            throw new BrandNameExistsException("Existent Brand record with same name, duplicated names not allowed");
        }

        var existentBrand = brandRepository.findById(brandDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid brand id, entity not found"));

        BeanUtils.copyProperties(brandDTO, existentBrand);
        return brandRepository.save(existentBrand);
    }

    public void delete(UUID id) throws ResourceNotFoundException {
        if(!brandRepository.existsById(id)) {
            throw new ResourceNotFoundException("Brand ID not found: " + id);
        }

        brandRepository.deleteById(id);
    }

    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    public Brand findById(UUID id) throws ResourceNotFoundException {
        return brandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
    }
    public Brand findByName(String name) throws ResourceNotFoundException {
        return brandRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
    }
}
