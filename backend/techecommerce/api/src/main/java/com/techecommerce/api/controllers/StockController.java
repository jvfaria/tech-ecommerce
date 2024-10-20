package com.techecommerce.api.controllers;

import com.techecommerce.main.dto.StockDTO;
import com.techecommerce.main.services.StockService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/stock")
@RequiredArgsConstructor
public class StockController {
    private final StockService stockService;

    @PreAuthorize("permitAll()")
    @Operation(summary = "Update product stock balance")
    @PutMapping("/{productId}")
    public ResponseEntity<StockDTO> updateStock(@RequestBody StockDTO stockDTO, @PathVariable String productId) {
        return ResponseEntity.ok().body(stockService.update(stockDTO, productId));
    }

    @PreAuthorize("permitAll()")
    @Operation(summary = "Get product stock balance")
    @GetMapping("/{productId}")
    public ResponseEntity<StockDTO> listStockById(@PathVariable String productId) {
        return ResponseEntity.ok().body(stockService.listStockById(productId));
    }
}
