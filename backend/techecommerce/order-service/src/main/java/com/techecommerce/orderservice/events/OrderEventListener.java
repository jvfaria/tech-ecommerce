package com.techecommerce.orderservice.events;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@Slf4j
public class OrderEventListener {
    @TransactionalEventListener
    public void handleOrderSaved(OrderSavedEvent event) {
        log.info("Order with ID {} has been successfully saved.", event.getOrderId());
    }
}
