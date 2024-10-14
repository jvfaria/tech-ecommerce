package com.techecommerce.orderservice.transformers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.techecommerce.main.dto.OrderDTO;
import com.techecommerce.messagingcore.dto.ResultDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class OrderMessageTransformer {

    @Autowired
    private ObjectMapper objectMapper;


    public ResultDTO<OrderDTO> transform(String message) {
        try {
            OrderDTO orderDTO = objectMapper.readValue(message, OrderDTO.class);

            return new ResultDTO<>(orderDTO);
        } catch (JsonProcessingException ex) {
            return new ResultDTO<>("Failed to transform order message".concat(ex.getMessage()));
        }
    }
}
