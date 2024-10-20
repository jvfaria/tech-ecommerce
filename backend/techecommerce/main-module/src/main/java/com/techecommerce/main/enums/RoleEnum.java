package com.techecommerce.main.enums;

import lombok.Getter;

@Getter
public enum RoleEnum {
    USER("ROLE_USER"),
    SUPER_ADMIN("ROLE_SUPER_ADMIN");

    private final String roleName;

    RoleEnum(String role) {
        this.roleName = role;
    }

}
