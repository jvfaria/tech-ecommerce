package com.techecommerce.main.transformers;

import com.techecommerce.main.dto.OrderProductDTO;
import com.techecommerce.main.models.OrderProducts;
import com.techecommerce.main.models.OrderProductsId;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderProductTransformer {
    public List<OrderProducts> toEntity(List<OrderProductDTO> dtos) {
        return dtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    public OrderProducts toEntity(OrderProductDTO dto) {
        if (dto == null) {
            return null;
        }

        OrderProductsId id = new OrderProductsId();
        id.setOrderId(dto.getOrderId());
        id.setProductId(dto.getProductId());

        OrderProducts entity = new OrderProducts();
        entity.setId(id);
        entity.setQuantity(dto.getQuantity());

        return entity;
    }
}
