package com.techecommerce.api.repositories;

import com.techecommerce.api.models.Product;
import com.techecommerce.api.repositories.custom.ProductRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID>, ProductRepositoryCustom {
    List<Product> findByFeaturedTrue();
    List<Product> findByCategoryName(String categoryName);
    List<Product> findByBrandName(String brandName);
}
