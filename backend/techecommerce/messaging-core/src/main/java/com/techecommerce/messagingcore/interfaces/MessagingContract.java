package com.techecommerce.messagingcore.interfaces;

public interface MessagingContract<T> {
    String sendMessage(T data);
}
