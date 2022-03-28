package com.techecommerce.api.controllers;

import com.techecommerce.api.dtos.BrandDTO;
import com.techecommerce.api.dtos.CategoryDTO;
import com.techecommerce.api.exceptions.BrandNameExistsException;
import com.techecommerce.api.exceptions.CategoryNameExistsException;
import com.techecommerce.api.exceptions.ResourceNotFoundException;
import com.techecommerce.api.models.Brand;
import com.techecommerce.api.models.Category;
import com.techecommerce.api.services.BrandService;
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
@RequestMapping("/v1/api/brands")
@Api(tags = "Brand")
public class BrandController {
    private final BrandService brandService;

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Create a new brand")
    @PostMapping
    public ResponseEntity<Brand> createCategory(@RequestBody BrandDTO brandDTO) throws BrandNameExistsException {
        Brand createdCategory = brandService.create(brandDTO);
        URI location = URI.create(String.format("categories/%s", brandDTO.getId()));
        return ResponseEntity.created(location).body(createdCategory);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Update brand's name")
    @PutMapping
    public ResponseEntity<Brand> updateCategory(@RequestBody BrandDTO brandDTO) throws ResourceNotFoundException, BrandNameExistsException {
        return new ResponseEntity<>(brandService.update(brandDTO), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Delete a brand")
    @DeleteMapping("/{id}")
    public ResponseEntity<Brand> deleteCategory(@PathVariable UUID id) throws ResourceNotFoundException {
        brandService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("permitAll()")
    @ApiOperation("List all brands")
    @GetMapping
    public ResponseEntity<List<Brand>> findAllCategories() {
        return new ResponseEntity<>(brandService.findAll(), HttpStatus.OK);
    }

    @ApiOperation("Find brand by id")
    @GetMapping("/{id}")
    public ResponseEntity<Brand> findById(@PathVariable UUID id) throws ResourceNotFoundException {
        return new ResponseEntity<>(brandService.findById(id), HttpStatus.OK);
    }
//
//    @ApiOperation("Find brand by name")
//    @GetMapping("/{name}")
//    public ResponseEntity<Brand> findByName(@PathVariable String name) throws ResourceNotFoundException {
//        return new ResponseEntity<>(brandService.findByName(name), HttpStatus.OK);
//    }
}
