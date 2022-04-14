package com.techecommerce.api.repositories.custom;

import com.techecommerce.api.dtos.filters.ProductFiltersDTO;
import com.techecommerce.api.models.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepositoryCustom {
    @Query("SELECT p FROM Product p WHERE UPPER(p.name) LIKE CONCAT('%',UPPER(:#{#filters.productName}),'%') ")
    List<Product> findByFilters(@Param("filters") ProductFiltersDTO filters);
}
