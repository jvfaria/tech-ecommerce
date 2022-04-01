package com.techecommerce.api.services;

import com.techecommerce.api.dtos.StockDTO;
import com.techecommerce.api.repositories.StockRepository;
import com.techecommerce.api.transformers.StockTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StockService {
    private final StockRepository stockRepository;
    private final StockTransformer stockTransformer;

    public StockDTO update(StockDTO stockDTO, String productId) {
        var existentStock = stockRepository.findByProductId(UUID.fromString(productId))
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        existentStock.setQuantity(stockDTO.getQuantity());
        return stockTransformer.toDTO(stockRepository.save(existentStock));
    }

    public StockDTO listStockById(String productId) {
        return stockTransformer.toDTO(stockRepository.findByProductId(UUID.fromString(productId)).orElseThrow(() -> new EntityNotFoundException("Product stock not found")));
    }
}
