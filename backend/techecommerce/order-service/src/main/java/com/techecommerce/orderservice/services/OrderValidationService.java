package com.techecommerce.orderservice.services;


import com.techecommerce.main.dtos.OrderDTO;
import com.techecommerce.main.dtos.OrderProductDTO;
import com.techecommerce.main.dtos.StockDTO;
import com.techecommerce.main.models.UserInfo;
import com.techecommerce.main.services.StockService;
import com.techecommerce.main.services.UserInfoService;
import com.techecommerce.main.services.UserService;
import com.techecommerce.messagingcore.interfaces.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class OrderValidationService implements ValidationService<OrderDTO> {

    @Autowired
    private StockService stockService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserInfoService userInfoService;

    @Override
    public boolean validate(OrderDTO dto) {
        return validateStock(dto) && validateUser(dto) ;
    }

    @Override
    public boolean validateStock(OrderDTO orderDTO) {
        List<OrderProductDTO> products = orderDTO.getProducts();
        List<UUID> productIds = products.stream().map(OrderProductDTO::getProductId).collect(Collectors.toList());
        List<StockDTO> dtos = stockService.listStockByProductIds(productIds);

        return dtos.stream().anyMatch(stockDTO -> products.stream().anyMatch(product -> {
            UUID stockProductId = stockDTO.getProduct().getId();
            if (Objects.nonNull(stockProductId)) {
                return product.getProductId().equals(stockProductId)
                        && stockDTO.getQuantity() >= product.getQuantity();
            }
            return false;
        }));
    }

    @Override
    public boolean validateUser(OrderDTO entity) {
        UserInfo userInformation = userInfoService.findByCpf(entity.getCustomer().getCpf());

        if(Objects.nonNull(userInformation.getUser().getId())) {
            return true;
        }

        return false;
    }
}
