package com.techecommerce.messagingcore.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.techecommerce.messagingcore.dto.MessageDTO;
import com.techecommerce.messagingcore.dto.MessageDefinitionDTO;
import com.techecommerce.messagingcore.interfaces.MessageSender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MessagingService implements MessageSender {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private RabbitMQProducer producer;

    @Override
    public void sendMessage(MessageDefinitionDTO messageDefinition, Object message) {
        try {
            String payload = transformMessageObjectToString(message);
            String type = messageDefinition.getMessageType();

            MessageDTO messageDTO = MessageDTO.builder().payload(payload).type(type).build();

            producer.sendMessage(messageDefinition, transformMessageObjectToString(messageDTO));
        } catch (JsonProcessingException ex) {
            log.error("Error when trying to convert JSON object to string, message was not sent");
            ex.printStackTrace();
        }
    }

    private String transformMessageObjectToString(Object messageObject) throws JsonProcessingException {
        return objectMapper.writeValueAsString(messageObject);
    }
}
