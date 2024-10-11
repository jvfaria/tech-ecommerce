package com.techecommerce.orderservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.techecommerce.main.dtos.OrderDTO;
import com.techecommerce.main.dtos.OrderProductDTO;
import com.techecommerce.main.exceptions.EmptyProductsException;
import com.techecommerce.messagingcore.services.MessagingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private OrderValidationService validation;

    private final MessagingService messagingService;

    public ResponseEntity<String> processOrder(OrderDTO orderDTO) {
        try {
            validateProducts(orderDTO.getProducts());
            validation.validate(orderDTO);

            return new ResponseEntity<>(messagingService.sendMessage(orderDTO), HttpStatus.OK);
        } catch (EmptyProductsException ex) {
            ex.printStackTrace();
            log.error("Error trying to validate message: {}", ex.getMessage());
        }

        return new ResponseEntity<>(StringUtils.EMPTY, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void validateProducts(List<OrderProductDTO> products) throws EmptyProductsException {
        if (products.isEmpty()) {
            throw new EmptyProductsException("Cannot close order without products on the cart");
        }
    }
}
