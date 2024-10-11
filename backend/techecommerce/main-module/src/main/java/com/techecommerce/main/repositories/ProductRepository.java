package com.techecommerce.main.repositories;

import com.techecommerce.main.models.Product;
import com.techecommerce.main.repositories.custom.ProductRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID>, ProductRepositoryCustom {
    List<Product> findByFeaturedTrue();
    List<Product> findByCategoryName(String categoryName);
    List<Product> findByBrandName(String brandName);
}
