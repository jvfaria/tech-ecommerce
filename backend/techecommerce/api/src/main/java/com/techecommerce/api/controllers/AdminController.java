package com.techecommerce.api.controllers;

import com.techecommerce.main.dtos.UserCreateDTO;
import com.techecommerce.main.exceptions.EmailExistsException;
import com.techecommerce.main.models.User;
import com.techecommerce.main.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/v1/admin")
@ApiIgnore
public class AdminController {
    @Autowired
    private UserService userService;

    @PostMapping("/create-super-admin")
    public ResponseEntity<User> createSuperAdmin(@RequestBody UserCreateDTO userDTO) throws EmailExistsException {
        User newSuperAdmin = userService.createSuperAdminUser(userDTO);

        return new ResponseEntity<>(newSuperAdmin, HttpStatus.CREATED);
    }

}
