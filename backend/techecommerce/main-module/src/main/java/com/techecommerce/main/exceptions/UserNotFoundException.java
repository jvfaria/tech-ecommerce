package com.techecommerce.main.exceptions;

@SuppressWarnings("serial")
public class UserNotFoundException extends Throwable {
    public UserNotFoundException(final String message) { super(message); }
}
