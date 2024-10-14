package com.techecommerce.messagingcore.interfaces;

import com.techecommerce.messagingcore.dto.MessageDefinitionDTO;

public interface MessageSender {
    void sendMessage(MessageDefinitionDTO messageDefinition, Object message);
}
