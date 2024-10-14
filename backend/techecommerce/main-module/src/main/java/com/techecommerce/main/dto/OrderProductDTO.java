package com.techecommerce.main.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class OrderProductDTO {
    private UUID orderId;
    private UUID productId;
    private Integer quantity;
}
