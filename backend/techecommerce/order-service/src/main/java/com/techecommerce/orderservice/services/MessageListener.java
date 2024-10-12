package com.techecommerce.orderservice.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.techecommerce.main.dtos.OrderDTO;
import com.techecommerce.messagingcore.dtos.ResultDTO;
import com.techecommerce.messagingcore.interfaces.MessageProcessor;
import com.techecommerce.orderservice.transformers.OrderMessageTransformer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MessageListener implements MessageProcessor {
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private OrderMessageTransformer transformer;

    @Autowired
    private OrderService orderService;

    @RabbitListener(queues = "${app.rabbitmq.queues.order-queue}")
    public void receiveMessage(String rawMessage) {
        log.info("Received raw message: {}", rawMessage);

        try {
            JsonNode rootNode = mapper.readTree(rawMessage);
            String type = rootNode.get("type").asText();
            String payload = rootNode.get("payload").asText();

            processMessage(payload, type);
        } catch (JsonProcessingException ex) {
            log.info("Error consuming message {}", ex);
        }
    }


    @Override
    public void processMessage(String payload, String type) {
        log.info("Processing received {} message ...", type);
        ResultDTO<OrderDTO> result = transformer.transform(payload);

        if(!result.isSuccess()) {
            log.info("Error processing message: {}", result.getErrorMessage());
        }
        orderService.processOrder(result.getPayload());

    }
}
