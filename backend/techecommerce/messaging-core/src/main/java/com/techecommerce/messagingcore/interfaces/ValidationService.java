package com.techecommerce.messagingcore.interfaces;

public interface ValidationService<T> {
    boolean validate(T entity);
    boolean validateStock(T entity);
    boolean validateUser(T entity);
}
