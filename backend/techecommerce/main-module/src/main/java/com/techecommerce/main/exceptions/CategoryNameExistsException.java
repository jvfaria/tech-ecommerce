package com.techecommerce.main.exceptions;

@SuppressWarnings("serial")
public class CategoryNameExistsException extends Throwable {
    public CategoryNameExistsException(final String message) {
        super(message);
    }

}
