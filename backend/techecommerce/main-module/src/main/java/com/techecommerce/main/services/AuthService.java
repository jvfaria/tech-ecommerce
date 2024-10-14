package com.techecommerce.main.services;

import com.techecommerce.main.exceptions.BadCredentialsException;
import com.techecommerce.main.exceptions.UserNotFoundException;
import com.techecommerce.main.dto.LoginUserDTO;
import com.techecommerce.main.models.User;
import com.techecommerce.main.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    public Authentication authManagerAuthenticate(LoginUserDTO login) throws UserNotFoundException {
        User user = userRepository.findByEmail(login.getEmail());

        if(Objects.isNull(user)) {
            log.error("User not found", UserNotFoundException.class);
            throw new UserNotFoundException("Incorrect login credentials");
        }
        Authentication auth = null;
        try {
            auth = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), login.getPassword()));
        } catch (Exception e) {
            throw new BadCredentialsException("Incorrect login credentials");
        }

        SecurityContextHolder.getContext().setAuthentication(auth);
        return auth;
    }
}
