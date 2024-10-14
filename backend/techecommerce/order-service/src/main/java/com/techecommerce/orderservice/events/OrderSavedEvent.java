package com.techecommerce.orderservice.events;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class OrderSavedEvent {
    private final UUID orderId;
}

