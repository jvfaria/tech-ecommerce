package com.techecommerce.api.controllers;

import com.techecommerce.main.dto.UserCreateDTO;
import com.techecommerce.main.dto.UserDTO;
import com.techecommerce.main.exceptions.EmailExistsException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.exceptions.UserNotFoundException;
import com.techecommerce.main.models.User;
import com.techecommerce.main.repositories.UserRepository;
import com.techecommerce.main.services.UserService;
import com.techecommerce.main.transformers.UserTransformer;
import io.swagger.v3.oas.annotations.Operation;
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


@RestController
@RequestMapping("v1/users")
@RequiredArgsConstructor
public class UserController {

    final UserRepository userRepository;
    final UserService userService;
    final UserTransformer transformer;

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "List all Users")
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        var users = userRepository.findAll();
        var usersDTO = transformer.toDTO(users);
        return new ResponseEntity<>(usersDTO, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Find User by ID")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) throws UserNotFoundException {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Find User by email")
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) throws UserNotFoundException {
        var user = userService.findByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Operation(summary = "Create new User")
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserCreateDTO user) throws EmailExistsException {
        var createdUser = userService.create(user);
        URI location = URI.create(String.format("users/%s", createdUser.getId()));
        return ResponseEntity.created(location).body(createdUser);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Delete existent User")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) throws ResourceNotFoundException {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
