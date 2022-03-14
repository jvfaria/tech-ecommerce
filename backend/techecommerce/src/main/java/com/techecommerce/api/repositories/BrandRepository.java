package com.techecommerce.api.repositories;

import com.techecommerce.api.models.Brand;
import com.techecommerce.api.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BrandRepository extends JpaRepository<Brand, UUID> {
    Boolean existsByName(String name);
    Optional<Brand> findByName(String name);
}
