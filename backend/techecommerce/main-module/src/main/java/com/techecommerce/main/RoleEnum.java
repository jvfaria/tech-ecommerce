package com.techecommerce.main;

import lombok.Getter;

@Getter
public enum RoleEnum {
    USER("USER"),
    SUPER_ADMIN("SUPER_ADMIN");

    private final String roleName;

    RoleEnum(String role) {
        this.roleName = role;
    }

}
