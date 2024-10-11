package com.techecommerce.main.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderProductDTO {
    private String productId;
    private Integer quantity;
}
