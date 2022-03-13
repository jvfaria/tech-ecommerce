package com.techecommerce.api.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateDTO {
    private String username;
    private String email;
    private String password;
}
