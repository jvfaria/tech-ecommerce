package com.techecommerce.api.controllers;

import com.techecommerce.api.dtos.ProductDTO;
import com.techecommerce.api.dtos.StockDTO;
import com.techecommerce.api.exceptions.ResourceNotFoundException;
import com.techecommerce.api.services.StockService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/api/stock")
@Api(tags = "Stock")
@RequiredArgsConstructor
public class StockController {
    private final StockService stockService;

    @PreAuthorize("permitAll()")
    @ApiOperation("Update product stock balance")
    @PutMapping("/{productId}")
    public ResponseEntity<StockDTO> updateStock(@RequestBody StockDTO stockDTO, @PathVariable String productId) {
        return ResponseEntity.ok().body(stockService.update(stockDTO, productId));
    }

    @PreAuthorize("permitAll()")
    @ApiOperation("Get product stock balance")
    @GetMapping("/{productId}")
    public ResponseEntity<StockDTO> listStockById(@PathVariable String productId) {
        return ResponseEntity.ok().body(stockService.listStockById(productId));
    }
}
