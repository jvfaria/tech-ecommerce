package com.techecommerce.api.controllers;

import com.techecommerce.api.config.jwt.TokenProvider;
import com.techecommerce.api.dtos.AuthToken;
import com.techecommerce.api.dtos.LoginUserDTO;
import com.techecommerce.api.exceptions.UserNotFoundException;
import com.techecommerce.api.services.AuthService;
import com.techecommerce.api.services.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/api/auth")
@Api(tags = "Authentication")
public class AuthController {
    final AuthenticationManager authenticationManager;
    final AuthService authService;
    final TokenProvider jwtTokenProvider;
    final UserService userService;

    @ApiOperation("Login")
    @PostMapping
    public ResponseEntity<AuthToken> generateToken(@RequestBody LoginUserDTO login) throws UserNotFoundException {
        Authentication auth = authService.authManagerAuthenticate(login);
        final String token = jwtTokenProvider.generateToken(auth);
        String username = null;
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        }

        var authToken = AuthToken.builder()
                .token(token)
                .username(username)
                .authorities(auth.getAuthorities()
                        .stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .build();

        return new ResponseEntity<>(authToken, HttpStatus.OK);
    }
}
