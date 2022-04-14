package com.techecommerce.api.controllers;

import com.techecommerce.api.dtos.UserCreateDTO;
import com.techecommerce.api.exceptions.EmailExistsException;
import com.techecommerce.api.exceptions.ResourceNotFoundException;
import com.techecommerce.api.exceptions.UserNotFoundException;
import com.techecommerce.api.models.User;
import com.techecommerce.api.repositories.UserRepository;
import com.techecommerce.api.services.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@Api(tags = "Users")
@RestController
@RequestMapping("v1/api/users")
@RequiredArgsConstructor
public class UserController {

    final UserRepository userRepository;
    final UserService userService;

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("List all Users")
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        var users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Find User by ID")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) throws UserNotFoundException {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Find User by email")
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) throws UserNotFoundException {
        var user = userService.findByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @ApiOperation("Create new User")
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserCreateDTO user) throws EmailExistsException {
        var createdUser = userService.create(user);
        URI location = URI.create(String.format("users/%s", createdUser.getId()));
        return ResponseEntity.created(location).body(createdUser);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ApiOperation("Delete existent User")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) throws ResourceNotFoundException {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
