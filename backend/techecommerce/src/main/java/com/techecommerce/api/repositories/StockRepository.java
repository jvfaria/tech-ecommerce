package com.techecommerce.api.repositories;

import com.techecommerce.api.models.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StockRepository extends JpaRepository<Stock, UUID> {
    Optional<Stock> findByProductId(UUID productId);
}
