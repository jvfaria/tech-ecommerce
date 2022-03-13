package com.techecommerce.api.controllers;

import com.techecommerce.api.config.jwt.TokenProvider;
import com.techecommerce.api.dtos.AuthToken;
import com.techecommerce.api.dtos.LoginUserDTO;
import com.techecommerce.api.exceptions.UserNotFoundException;
import com.techecommerce.api.services.AuthService;
import com.techecommerce.api.services.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/api")
@Api(tags = "Authentication")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    AuthService authService;
    @Autowired
    TokenProvider jwtTokenProvider;
    @Autowired
    UserService userService;;

    @ApiOperation("Login")
    @PostMapping(value = "/auth")
    public ResponseEntity generateToken(@RequestBody LoginUserDTO login) throws UserNotFoundException {
        Authentication auth = authService.authManagerAuthenticate(login);
        final String token = jwtTokenProvider.generateToken(auth);
        return new ResponseEntity<>(new AuthToken(token), HttpStatus.OK);
    }
}
