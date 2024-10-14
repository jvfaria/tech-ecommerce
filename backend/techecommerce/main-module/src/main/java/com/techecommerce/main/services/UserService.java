package com.techecommerce.main.services;

import com.techecommerce.main.RoleEnum;
import com.techecommerce.main.config.security.CustomPasswordEncoder;
import com.techecommerce.main.dto.UserCreateDTO;
import com.techecommerce.main.exceptions.EmailExistsException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.exceptions.UserNotFoundException;
import com.techecommerce.main.models.Role;
import com.techecommerce.main.models.User;
import com.techecommerce.main.models.UserRole;
import com.techecommerce.main.repositories.RoleRepository;
import com.techecommerce.main.repositories.UserRepository;
import com.techecommerce.main.transformers.UserCreateTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    CustomPasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserCreateTransformer userTransformer;

    public User createSuperAdminUser(UserCreateDTO userDTO) throws EmailExistsException {
        validateUserCreation(userDTO);

        User user = userTransformer.toEntity(userDTO);
        user.setUsername(userDTO.getUsername().toUpperCase(Locale.ROOT));
        user.setPassword(passwordEncoder.getEncoder().encode(userDTO.getPassword()));

        createUserRole(user, RoleEnum.SUPER_ADMIN);

        return userRepository.save(user);
    }

    private void createUserRole(User user, RoleEnum role) {
        Role superAdminRole = roleRepository.findByName(role.getRoleName())
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(superAdminRole);
        user.setRoles(List.of(userRole));
    }

    public User create(UserCreateDTO userDTO) throws EmailExistsException {
        validateUserCreation(userDTO);
        User user = userTransformer.toEntity(userDTO);
        user.setUsername(userDTO.getUsername().toUpperCase(Locale.ROOT));
        user.setPassword(passwordEncoder.getEncoder().encode(userDTO.getPassword()));

        createUserRole(user, RoleEnum.USER);

        return userRepository.save(user);
    }

    private void validateUserCreation(UserCreateDTO userDTO) throws EmailExistsException {
        if(this.emailExists(userDTO.getEmail())) {
            throw new EmailExistsException("Email já cadastrado ! Insira um outro email ainda não utilizado.");
        }

        if(this.usernameExists(userDTO.getUsername())) {
            throw new EmailExistsException("Username já existente ! Escolha um que ainda não foi utilizado.");
        }
    }

    public void delete(UUID id) throws ResourceNotFoundException {
        Optional<User> user = userRepository.findById(id);

        if(!user.isPresent()) {
            throw new ResourceNotFoundException("User ID not found: " + id);
        }
        userRepository.delete(user.get());
    }

    public User findById(UUID id) throws UserNotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public User findByEmail(String email) throws UserNotFoundException {
        var user =  userRepository.findByEmail(email);

        if(Objects.isNull(user)) {
            throw new UserNotFoundException("User not found");
        }
        return user;
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    private Set<? extends SimpleGrantedAuthority> getAuthorities(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getRole().getName())));

        return authorities;
    }
}
