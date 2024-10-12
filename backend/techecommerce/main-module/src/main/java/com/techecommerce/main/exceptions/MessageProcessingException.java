package com.techecommerce.main.exceptions;

@SuppressWarnings("serial")
public class MessageProcessingException extends Throwable {
    public MessageProcessingException(final String message, Exception e) { super(message, e); };
}
