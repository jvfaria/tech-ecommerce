package com.techecommerce.messagingcore.services;

import com.techecommerce.messagingcore.configs.RabbitMQConfig;
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
@RequiredArgsConstructor
@Slf4j
public class RabbitMQProducer {
    private final RabbitTemplate rabbitTemplate;

    @Autowired
    private RabbitMQConfig rabbitConfig;

    protected String sendMessage(String message) {
        log.info("Sending message {} to exchange {}", message, rabbitConfig.getOrderExchange());
        rabbitTemplate.convertAndSend(rabbitConfig.getOrderExchange(), rabbitConfig.getOrderRoutingKey(), message);
        log.info("Sent message: {}", message);

        return message;
    }
}
