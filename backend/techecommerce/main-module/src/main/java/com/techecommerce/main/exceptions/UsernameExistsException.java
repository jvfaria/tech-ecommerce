package com.techecommerce.main.exceptions;

@SuppressWarnings("serial")
public class UsernameExistsException extends Throwable {
    public UsernameExistsException(final String message) { super(message); }
}
