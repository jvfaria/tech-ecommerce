package com.techecommerce.api.services;

import com.techecommerce.api.config.security.CustomPasswordEncoder;
import com.techecommerce.api.dtos.UserCreateDTO;
import com.techecommerce.api.exceptions.EmailExistsException;
import com.techecommerce.api.exceptions.ResourceNotFoundException;
import com.techecommerce.api.exceptions.UserNotFoundException;
import com.techecommerce.api.models.Role;
import com.techecommerce.api.models.User;
import com.techecommerce.api.repositories.UserRepository;
import com.techecommerce.api.transformers.UserTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    CustomPasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserTransformer userTransformer;

    public User create(UserCreateDTO userDTO) throws EmailExistsException {
        if(this.emailExists(userDTO.getEmail())) {
            throw new EmailExistsException("Email já cadastrado ! Insira um outro email ainda não utilizado.");
        }

        if(this.usernameExists(userDTO.getUsername())) {
            throw new EmailExistsException("Username já existente ! Escolha um que ainda não foi utilizado.");
        }
        User user = userTransformer.toEntity(userDTO);
        user.setUsername(userDTO.getUsername().toUpperCase(Locale.ROOT));
        user.setPassword(passwordEncoder.getEncoder().encode(userDTO.getPassword()));
        return userRepository.save(user);
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
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));

        return authorities;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if(Objects.isNull(user)) {
            throw new UsernameNotFoundException("User not found !");
        }
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthorities(user));
        return userDetails;
    }
}
