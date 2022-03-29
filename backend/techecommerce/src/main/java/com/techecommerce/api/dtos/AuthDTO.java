package com.techecommerce.api.dtos;

import com.techecommerce.api.models.Role;
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
