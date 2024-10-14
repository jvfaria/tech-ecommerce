package com.techecommerce.main.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private CustomerDTO customer;
    private List<OrderProductDTO> products;
    private BigDecimal totalPrice;
    private LocalDateTime orderDate;
}
