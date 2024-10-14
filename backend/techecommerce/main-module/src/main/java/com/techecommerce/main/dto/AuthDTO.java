package com.techecommerce.main.dto;

import com.techecommerce.main.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AuthDTO {
    private String email;
    private List<Role> roles;
}
