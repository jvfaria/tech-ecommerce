package com.techecommerce.main.repositories;

import com.techecommerce.main.models.OrderProducts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderProductRepository extends JpaRepository<OrderProducts, UUID> {
}
