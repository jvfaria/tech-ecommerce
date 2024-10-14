package com.techecommerce.main.repositories.custom;

import com.techecommerce.main.models.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepositoryCustom {
    @Query("SELECT p FROM Product p WHERE UPPER(p.name) LIKE CONCAT('%', UPPER(:productName), '%')")
    List<Product> findByFilters(@Param("productName") String productName);
}
