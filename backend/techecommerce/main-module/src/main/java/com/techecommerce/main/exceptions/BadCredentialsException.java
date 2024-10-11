package com.techecommerce.main.exceptions;

public class BadCredentialsException extends org.springframework.security.authentication.BadCredentialsException {
    public BadCredentialsException(final String message) {
        super(message);
    }
}
