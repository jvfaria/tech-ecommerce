package com.techecommerce.api.repositories;

import com.techecommerce.api.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Boolean existsByName(String name);
    Optional<Category> findByName(String name);
}
