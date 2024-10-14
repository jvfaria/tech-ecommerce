package com.techecommerce.main.repositories;

import com.techecommerce.main.models.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BrandRepository extends JpaRepository<Brand, UUID> {
    Boolean existsByName(String name);
    Optional<Brand> findByName(String name);
}
