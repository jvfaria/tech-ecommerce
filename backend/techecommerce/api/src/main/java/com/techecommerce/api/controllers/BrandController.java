package com.techecommerce.api.controllers;

import com.techecommerce.main.dto.ApiResponse;
import com.techecommerce.main.dto.BrandDTO;
import com.techecommerce.main.exceptions.BrandNameExistsException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.Brand;
import com.techecommerce.main.services.BrandService;
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
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/brands")
public class BrandController {
    private final BrandService brandService;

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Create a new brand")
    @PostMapping
    public ResponseEntity<ApiResponse<BrandDTO>> createBrand(@RequestBody BrandDTO brandDTO) throws BrandNameExistsException, ResourceNotFoundException {
        BrandDTO createdBrand = brandService.create(brandDTO);
        URI location = URI.create(String.format("brands/%s", brandDTO.getId()));
        return ResponseEntity.created(location).body(new ApiResponse<>(createdBrand));
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Update brand's name")
    @PutMapping
    public ResponseEntity<ApiResponse<Brand>> updateBrand(@RequestBody BrandDTO brandDTO) throws ResourceNotFoundException, BrandNameExistsException {
        Brand updatedBrand = brandService.update(brandDTO);
        ApiResponse<Brand> apiResponse = ApiResponse
                .<Brand>builder().data(updatedBrand).error(null).message(null).build();

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Delete a brand")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBrand(@PathVariable UUID id) throws ResourceNotFoundException {
        brandService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("permitAll()")
    @Operation(summary = "List all brands")
    @GetMapping
    public ResponseEntity<ApiResponse<Object>> findAllBrands() {
        return brandService.listAllBrands();
    }

    @Operation(summary = "Find brand by id")
    @GetMapping("/id/{id}")
    public ResponseEntity<ApiResponse<BrandDTO>> findById(@PathVariable String id) throws ResourceNotFoundException {
        return brandService.findById(id);
    }

    @Operation(summary = "Find brand by name")
    @GetMapping("/name/{name}")
    public ResponseEntity<ApiResponse<BrandDTO>> findByName(@PathVariable String name) throws ResourceNotFoundException {
        return brandService.findByName(name);
    }
}
