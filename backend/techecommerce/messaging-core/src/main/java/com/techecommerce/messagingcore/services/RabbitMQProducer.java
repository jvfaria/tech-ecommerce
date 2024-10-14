package com.techecommerce.messagingcore.services;

import com.techecommerce.messagingcore.dto.MessageDefinitionDTO;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Getter
@Setter
@Slf4j
public class RabbitMQProducer {
    private final RabbitTemplate rabbitTemplate;

    @Autowired
    public RabbitMQProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    protected String sendMessage(MessageDefinitionDTO messageDefinition, String message) {
        log.info("Sending message {} to exchange {}", message, messageDefinition.getExchange());
        rabbitTemplate.convertAndSend(messageDefinition.getExchange(), messageDefinition.getRoutingKey(), message);
        log.info("Sent message: {}", message);

        return message;
    }
}
