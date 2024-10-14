package com.techecommerce.main.transformers;

import com.techecommerce.main.dto.OrderDTO;
import com.techecommerce.main.models.Order;
import org.springframework.stereotype.Component;

@Component
public class OrderTransformer extends AbstractTransformer<Order, OrderDTO> {
    public OrderTransformer() { super(Order.class, OrderDTO.class); }
}
