package com.techecommerce.orderservice.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.techecommerce.main.dto.OrderDTO;
import com.techecommerce.main.dto.OrderProductDTO;
import com.techecommerce.main.exceptions.EmptyProductsException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.Order;
import com.techecommerce.main.models.OrderProducts;
import com.techecommerce.main.models.Product;
import com.techecommerce.main.models.UserInfo;
import com.techecommerce.main.repositories.OrderProductRepository;
import com.techecommerce.main.repositories.OrderRepository;
import com.techecommerce.main.repositories.ProductRepository;
import com.techecommerce.main.repositories.UserInfoRepository;
import com.techecommerce.main.transformers.OrderProductTransformer;
import com.techecommerce.main.transformers.OrderTransformer;
import com.techecommerce.messagingcore.configs.RabbitMQConfig;
import com.techecommerce.messagingcore.dto.MessageDefinitionDTO;
import com.techecommerce.messagingcore.services.MessagingService;
import com.techecommerce.orderservice.events.OrderSavedEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private OrderValidationService validation;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    private final OrderRepository orderRepository;

    private final OrderProductRepository orderProductRepository;

    private final ProductRepository productRepository;

    private final UserInfoRepository userInfoRepository;

    private final RabbitMQConfig rabbitMQConfig;

    private final MessagingService messagingService;

    private final OrderTransformer orderTransformer;

    private final OrderProductTransformer orderProductTransformer;

    public ResponseEntity<OrderDTO> sendOrder(OrderDTO orderDTO) {
        LocalDateTime start = LocalDateTime.now();
        try {
            validateProducts(orderDTO.getProducts());
            validation.validate(orderDTO);

            MessageDefinitionDTO messageDefinitionDTO = buildMessageDefinition();

            messagingService.sendMessage(messageDefinitionDTO, orderDTO);

            return new ResponseEntity<>(orderDTO, HttpStatus.OK);
        } catch (EmptyProductsException ex) {
            ex.printStackTrace();
            log.error("Error trying to validate message: {}", ex.getMessage());
        } finally {
            log.info("Order sending took {} seconds", Duration.between(start, LocalDateTime.now()));
        }

        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private MessageDefinitionDTO buildMessageDefinition() {
        MessageDefinitionDTO messageDefinitionDTO = new MessageDefinitionDTO();
        messageDefinitionDTO.setMessageType("ORDER");
        messageDefinitionDTO.setExchange(rabbitMQConfig.getOrderExchange());
        messageDefinitionDTO.setQueue(rabbitMQConfig.getOrderQueue());
        messageDefinitionDTO.setRoutingKey(rabbitMQConfig.getOrderRoutingKey());
        return messageDefinitionDTO;
    }

    @Transactional
    public void processOrder(OrderDTO order) {
        try {
            Order savedOrder = saveOrder(order);
            saveOrderProducts(order, savedOrder.getId());

            eventPublisher.publishEvent(new OrderSavedEvent(savedOrder.getId()));
        } catch (Exception | ResourceNotFoundException e) {
            log.error("Failed to save order: ", e);
        }
    }


    public void saveOrderProducts(OrderDTO orderDTO, UUID orderId) {
        List<OrderProductDTO> products = orderDTO.getProducts();
        products.forEach(product -> {
            product.setOrderId(orderId);
        });
        Order savedOrder = orderRepository.getById(orderId);

        List<OrderProducts> entities = orderProductTransformer.toEntity(products);

        entities.forEach(entity -> {
            entity.setOrder(savedOrder);
            Product productEntity = null;
            try {
               productEntity = productRepository
                        .findById(entity.getId().getProductId()).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            } catch (ResourceNotFoundException e) {
                throw new RuntimeException(e);
            }

            entity.setProduct(productEntity);
        });

        orderProductRepository.saveAll(entities);
    }

    public Order saveOrder(OrderDTO orderDTO) throws ResourceNotFoundException {
        return orderRepository.save(createOrder(orderDTO));
    }

    public Order createOrder(OrderDTO orderDTO) throws ResourceNotFoundException {
        UserInfo existingUserInfo = userInfoRepository.findByCpf(orderDTO.getCustomer().getCpf())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Order entity = orderTransformer.toEntity(orderDTO);

        Order newOrder = new Order();
        newOrder.setCustomer(existingUserInfo);
        newOrder.setOrderDate(entity.getOrderDate());
        newOrder.setTotalPrice(entity.getTotalPrice());

        return newOrder;
    }

    private void validateProducts(List<OrderProductDTO> products) throws EmptyProductsException {
        if (products.isEmpty()) {
            throw new EmptyProductsException("Cannot close order without products on the cart");
        }
    }
}
