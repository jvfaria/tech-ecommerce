package com.techecommerce.main.repositories;

import com.techecommerce.main.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
}
