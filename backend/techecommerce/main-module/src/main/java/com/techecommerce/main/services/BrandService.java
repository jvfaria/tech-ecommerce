package com.techecommerce.main.services;

import com.techecommerce.main.dto.ApiResponse;
import com.techecommerce.main.dto.BrandDTO;
import com.techecommerce.main.exceptions.BrandNameExistsException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.Brand;
import com.techecommerce.main.repositories.BrandRepository;
import com.techecommerce.main.transformers.BrandTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;
    private final BrandTransformer brandTransformer;

    public BrandDTO create(BrandDTO brandDTO) throws BrandNameExistsException, ResourceNotFoundException {
        validateBrand(brandDTO);
        var brand = brandTransformer.toEntity(brandDTO);
        brand.setName(brand.getName().toUpperCase(Locale.ROOT));
        return brandTransformer.toDTO(brandRepository.save(brand));
    }

    public Brand update(BrandDTO brandDTO) throws BrandNameExistsException, ResourceNotFoundException {
        var existentBrand = brandRepository.findById(brandDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid brand id, entity was not found"));

        BeanUtils.copyProperties(brandDTO, existentBrand);
        return brandRepository.save(existentBrand);
    }

    private void validateBrand(BrandDTO brandDTO) throws BrandNameExistsException, ResourceNotFoundException {
        var brandExists = brandRepository.existsByName(brandDTO.getName());
        if(brandExists) {
            throw new BrandNameExistsException("Existent Brand record with same name, duplicated names not allowed");
        }
    }

    public void delete(UUID id) throws ResourceNotFoundException {
        if(!brandRepository.existsById(id)) {
            throw new ResourceNotFoundException("Brand ID not found: " + id);
        }

        brandRepository.deleteById(id);
    }

    public ResponseEntity<ApiResponse<Object>> listAllBrands() {
        List<Brand> brands = brandRepository.findAll();
        if(brands.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(HttpStatus.NOT_FOUND.name(), "No brands found"));
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(brandTransformer.toDTO(brands)));
    }

    public ResponseEntity<ApiResponse<BrandDTO>> findById(String id) throws ResourceNotFoundException {
        var existentBrand = brandRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(brandTransformer.toDTO(existentBrand)));
    }
    public ResponseEntity<ApiResponse<BrandDTO>> findByName(String name) throws ResourceNotFoundException {
        Brand brand = brandRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(brandTransformer.toDTO(brand)));
    }
}
