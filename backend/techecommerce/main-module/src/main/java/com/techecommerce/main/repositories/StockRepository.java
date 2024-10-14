package com.techecommerce.main.repositories;

import com.techecommerce.main.models.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StockRepository extends JpaRepository<Stock, UUID> {
    Optional<Stock> findByProductId(UUID productId);
    Optional<List<Stock>> findByProductIdIn(List<UUID> productIds);
}
