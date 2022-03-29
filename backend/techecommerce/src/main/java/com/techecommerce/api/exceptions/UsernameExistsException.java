package com.techecommerce.api.exceptions;

@SuppressWarnings("serial")
public class UsernameExistsException extends Throwable {
    public UsernameExistsException(final String message) { super(message); }
}
