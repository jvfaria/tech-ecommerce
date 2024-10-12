package com.techecommerce.messagingcore.interfaces;

public interface ProcessorContract<T> {
    T process(String message);
}
