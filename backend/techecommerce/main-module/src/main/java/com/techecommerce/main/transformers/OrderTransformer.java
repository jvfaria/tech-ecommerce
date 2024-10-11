package com.techecommerce.main.transformers;

import com.techecommerce.main.models.Order;
import com.techecommerce.main.dtos.OrderDTO;
import org.springframework.stereotype.Component;

@Component
public class OrderTransformer extends AbstractTransformer<Order, OrderDTO> {
    protected OrderTransformer() {super(Order .class, OrderDTO .class);}
}
