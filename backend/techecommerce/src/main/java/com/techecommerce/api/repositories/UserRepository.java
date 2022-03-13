package com.techecommerce.api.repositories;

import com.techecommerce.api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);

    @Override
    <S extends User> S save(S s);

    User findByUsername(String username);
    User findByEmail(String email);
}
