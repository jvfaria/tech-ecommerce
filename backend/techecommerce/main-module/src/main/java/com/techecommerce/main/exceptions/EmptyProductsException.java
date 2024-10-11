package com.techecommerce.main.exceptions;

@SuppressWarnings("serial")
public class EmptyProductsException extends Throwable {
    public EmptyProductsException(final String message) { super(message); }
}
