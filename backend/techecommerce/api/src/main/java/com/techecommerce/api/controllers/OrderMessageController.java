package com.techecommerce.api.controllers;

import com.techecommerce.main.dtos.OrderDTO;
import com.techecommerce.orderservice.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/messages")
@Api(tags = "Order message service")
@Slf4j
public class OrderMessageController {
    @Autowired
    private OrderService service;

    @PostMapping("/send-order")
    @ApiOperation("Send order message")
    public ResponseEntity<String> sendOrder(@RequestBody OrderDTO order) {
        log.info("Processing order ... {}", order);

        return service.processOrder(order);
    }
}
