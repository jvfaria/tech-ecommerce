package com.techecommerce.api.exceptions;

@SuppressWarnings("serial")
public class ResourceNotFoundException extends Throwable {
        public ResourceNotFoundException(final String message) { super(message); }
}
