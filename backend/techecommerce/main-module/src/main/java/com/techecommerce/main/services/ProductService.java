package com.techecommerce.main.services;

import com.techecommerce.main.dtos.ProductDTO;
import com.techecommerce.main.dtos.filters.ProductFiltersDTO;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.Brand;
import com.techecommerce.main.models.Category;
import com.techecommerce.main.models.Product;
import com.techecommerce.main.repositories.BrandRepository;
import com.techecommerce.main.repositories.CategoryRepository;
import com.techecommerce.main.repositories.ProductRepository;
import com.techecommerce.main.transformers.BrandTransformer;
import com.techecommerce.main.transformers.CategoryTransformer;
import com.techecommerce.main.transformers.ProductTransformer;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private static final String INVALID_CATEGORY = "Invalid category. Category doesn't exist on database, must pass an existent category";
    private static final String INVALID_BRAND = "Invalid brand. Brand doesn't exist on database, must pass an existent brand";
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductTransformer productTransformer;
    private final CategoryTransformer categoryTransformer;
    private final BrandTransformer brandTransformer;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(String id) throws ResourceNotFoundException {
       return productRepository
               .findById(UUID.fromString(id))
               .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }
    public List<Product> findByFilters(ProductFiltersDTO filters) throws ResourceNotFoundException {
        if(StringUtils.isBlank(filters.getProductName())) {
            throw new ResourceNotFoundException("Not found any product with that name");
        }

       return productRepository.findByFilters(filters.getProductName());
    }

    public List<Product> findByFeaturedTrue() {
       return productRepository.findByFeaturedTrue();
    }

    public List<Product> findByCategoryName(String categoryName) throws ResourceNotFoundException {
        if(Boolean.FALSE.equals(categoryRepository.existsByName(categoryName))) {
            throw new ResourceNotFoundException("Category does not exists");
        }
       return productRepository.findByCategoryName(categoryName);
    }

    public List<Product> findByBrandName(String brandName) throws ResourceNotFoundException {
        if(Boolean.FALSE.equals(brandRepository.existsByName(brandName))) {
            throw new ResourceNotFoundException("Brand does not exists");
        }
       return productRepository.findByBrandName(brandName);
    }

    public Long countAll() {
       return productRepository.count();
    }

    public Product create(ProductDTO productDTO) throws ResourceNotFoundException {
        var existentCategory = categoryRepository.findByName(productDTO.getCategory().getName().toUpperCase(Locale.ROOT)).orElseThrow(
                () -> new ResourceNotFoundException(INVALID_CATEGORY));

        var existentBrand = brandRepository.findByName(productDTO.getBrand().getName().toUpperCase(Locale.ROOT)).orElseThrow(
                () -> new ResourceNotFoundException(INVALID_BRAND));

        productDTO.getCategory().setId(existentCategory.getId());
        productDTO.getBrand().setId(existentBrand.getId());

        var product = productTransformer.toEntity(productDTO);

        return productRepository.save(product);
    }

    public ProductDTO update(ProductDTO productDTO, String id) throws ResourceNotFoundException {
        var existentProduct = productRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResourceNotFoundException("Product does not exist. Cannot update a non existent product"));

        Category existentCategory;
        Brand existentBrand;
        if (Objects.nonNull(productDTO.getCategory())) {
            existentCategory = categoryRepository.findByName(productDTO.getCategory().getName().toUpperCase(Locale.ROOT)).orElseThrow(
                    () -> new ResourceNotFoundException(INVALID_CATEGORY));
            existentProduct.setCategory(existentCategory);
        }

        if (Objects.nonNull(productDTO.getBrand())) {
            existentBrand = brandRepository.findByName(productDTO.getBrand().getName().toUpperCase(Locale.ROOT)).orElseThrow(
                    () -> new ResourceNotFoundException(INVALID_BRAND));
            existentProduct.setBrand(existentBrand);
        }
        BeanUtils.copyProperties(productDTO, existentProduct, "id");


        return productTransformer.toDTO(productRepository.save(existentProduct));
    }
}
