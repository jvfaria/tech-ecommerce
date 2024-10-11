package com.techecommerce.main.services;

import com.techecommerce.main.dtos.BrandDTO;
import com.techecommerce.main.exceptions.BrandNameExistsException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.Brand;
import com.techecommerce.main.repositories.BrandRepository;
import com.techecommerce.main.transformers.BrandTransformer;
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

    public List<BrandDTO> findAll() {
        return brandTransformer.toDTO(brandRepository.findAll());
    }

    public BrandDTO findById(String id) throws ResourceNotFoundException {
        var existentBrand = brandRepository.findById(UUID.fromString(id)).orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
        return brandTransformer.toDTO(existentBrand);
    }
    public Brand findByName(String name) throws ResourceNotFoundException {
        return brandRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
    }
}
