package com.techecommerce.main.repositories;

import com.techecommerce.main.models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
}
