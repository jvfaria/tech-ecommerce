package com.techecommerce.main.services;

import com.techecommerce.main.dtos.StockDTO;
import com.techecommerce.main.models.Stock;
import com.techecommerce.main.repositories.StockRepository;
import com.techecommerce.main.transformers.StockTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
        return stockTransformer
                .toDTO(stockRepository.findByProductId(UUID.fromString(productId))
                        .orElseThrow(() -> new EntityNotFoundException("Product stock not found")));
    }

    public List<StockDTO> listStockByProductIds(List<String> ids) {
        List<UUID> uuidList = ids.stream().map(UUID::fromString).collect(Collectors.toList());

        List<Stock> stockProducts = stockRepository
                .findByProductIdIn(uuidList).orElseThrow(() -> new EntityNotFoundException("Nothing found on stock table"));


        return stockTransformer.toDTO(stockProducts);
    }
}
