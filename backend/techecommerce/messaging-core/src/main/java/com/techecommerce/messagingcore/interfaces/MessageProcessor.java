package com.techecommerce.messagingcore.interfaces;

public interface MessageProcessor {
    void processMessage(String payload, String type);
}
