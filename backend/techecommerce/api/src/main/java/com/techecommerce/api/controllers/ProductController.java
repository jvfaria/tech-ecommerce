package com.techecommerce.api.controllers;

import com.techecommerce.main.dto.ProductDTO;
import com.techecommerce.main.dto.filters.ProductFiltersDTO;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.Product;
import com.techecommerce.main.services.ProductService;
import com.techecommerce.main.transformers.ProductTransformer;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/products")
public class ProductController {
    private final ProductService productService;
    private final ProductTransformer productTransformer;

    @Operation(summary = "List all products")
    @GetMapping
    public ResponseEntity<List<ProductDTO>> listAllProducts() {
        return ResponseEntity.ok().body(productTransformer.toDTO(productService.findAll()));
    }

    @Operation(summary = "Find all featured products")
    @GetMapping("/featured")
    public ResponseEntity<List<ProductDTO>> listAllFeaturedProducts() {
        return ResponseEntity.ok().body(productTransformer.toDTO(productService.findByFeaturedTrue()));
    }

    @Operation(summary = "Find all products by category name")
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<ProductDTO>> listProductsByCategory(@PathVariable String categoryName) throws ResourceNotFoundException {
        return ResponseEntity.ok().body(productTransformer.toDTO(productService.findByCategoryName(categoryName)));
    }

    @Operation(summary = "Find all products by brand name")
    @GetMapping("/brand/{brandName}")
    public ResponseEntity<List<ProductDTO>> listProductsByBrand(@PathVariable String brandName) throws ResourceNotFoundException {
        return ResponseEntity.ok().body(productTransformer.toDTO(productService.findByBrandName(brandName)));
    }

    @Operation(summary = "Find a product by id")
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> listProductById(@PathVariable String id) throws ResourceNotFoundException {
        var existentProduct = productService.findById(id);
        if(Objects.isNull(existentProduct)) {
            throw new ResourceNotFoundException("Product not found");
        }
        return ResponseEntity.ok().body(productTransformer.toDTO(existentProduct));
    }

    @Operation(summary = "Find products by filters")
    @GetMapping("/filters")
    public ResponseEntity<List<ProductDTO>> listProductByFilters(@RequestBody ProductFiltersDTO filters) throws ResourceNotFoundException {
        var existentProduct = productService.findByFilters(filters);

        return ResponseEntity.ok().body(productTransformer.toDTO(existentProduct));
    }

    @Operation(summary = "Get total products number")
    @GetMapping("/total")
    public ResponseEntity<Long> getTotalProducts() {
        return ResponseEntity.ok().body(productService.countAll());
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Create a new product")
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductDTO productDTO) throws ResourceNotFoundException {
        URI location = URI.create(String.format("products/%s", productDTO.getId()));
        var createdProduct = productService.create(productDTO);
        return ResponseEntity.created(location).body(createdProduct);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Update an existent product")
    @PatchMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDTO, @PathVariable String id) throws ResourceNotFoundException {
        var updatedProduct = productService.update(productDTO, id);
        return ResponseEntity.ok().body(updatedProduct);
    }
    
}
