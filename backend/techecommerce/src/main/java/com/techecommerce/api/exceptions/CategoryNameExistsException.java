package com.techecommerce.api.exceptions;

@SuppressWarnings("serial")
public class CategoryNameExistsException extends Throwable {
    public CategoryNameExistsException(final String message) {
        super(message);
    }

}
