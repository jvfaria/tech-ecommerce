package com.techecommerce.messagingcore.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class RabbitMQConsumer {
    @RabbitListener(queues = "${app.rabbitmq.queues.order-queue}")
    protected void receiveMessage(String message) {
        log.info("Received message: {}", message);
    }
}
