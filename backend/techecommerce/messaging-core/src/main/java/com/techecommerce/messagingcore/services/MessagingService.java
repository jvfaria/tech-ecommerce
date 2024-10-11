package com.techecommerce.messagingcore.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.techecommerce.messagingcore.interfaces.MessagingContract;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MessagingService implements MessagingContract<Object> {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private RabbitMQProducer producer;

    @Override
    public String sendMessage(Object data) {
        try {
            String message = transformMessageObjectToString(data);

            return producer.sendMessage(message);
        } catch (JsonProcessingException ex) {
            log.error("Error when trying to convert JSON object to string, message was not sent");
            ex.printStackTrace();
        }

        return "";
    }

    private String transformMessageObjectToString(Object messageObject) throws JsonProcessingException {
        return objectMapper.writeValueAsString(messageObject);
    }
}
