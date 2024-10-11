package com.techecommerce.main.exceptions;

@SuppressWarnings("serial")
public class BrandNameExistsException extends Throwable {
    public BrandNameExistsException(final String message) {
        super(message);
    }
}
