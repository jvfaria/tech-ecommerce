package com.techecommerce.api.controllers;

import com.techecommerce.api.dtos.ProductDTO;
import com.techecommerce.api.exceptions.ResourceNotFoundException;
import com.techecommerce.api.models.Product;
import com.techecommerce.api.services.ProductService;
import com.techecommerce.api.transformers.ProductTransformer;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/products")
@Api(tags = "Products")
public class ProductController {
    private final ProductService productService;
    private final ProductTransformer productTransformer;

    @ApiOperation("List all products")
    @GetMapping
    public ResponseEntity<List<ProductDTO>> listAllProducts() {
        return ResponseEntity.ok().body(productTransformer.toDTO(productService.findAll()));
    }

    @ApiOperation("Find a product by id")
    @GetMapping("/{id}")
    public ResponseEntity<Product> listProductById(@RequestParam UUID id) throws ResourceNotFoundException {
        return ResponseEntity.ok().body(productService.findById(id));
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Create a new product")
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductDTO productDTO) throws ResourceNotFoundException {
        URI location = URI.create(String.format("products/%s", productDTO.getId()));
        var createdProduct = productService.create(productDTO);
        return ResponseEntity.created(location).body(createdProduct);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Update an existent product")
    @PatchMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDTO, @PathVariable String id) throws ResourceNotFoundException {
        var updatedProduct = productService.update(productDTO, id);
        return ResponseEntity.ok().body(updatedProduct);
    }
}
