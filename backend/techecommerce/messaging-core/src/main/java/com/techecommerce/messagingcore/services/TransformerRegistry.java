package com.techecommerce.messagingcore.services;

import com.techecommerce.main.dtos.OrderDTO;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class TransformerRegistry {
    private final Map<String, Class<?>> registry = new HashMap<>();
//    private final Map<Class<?>, MessageTransformer<?>> transformerRegistry = new HashMap<>();

    public TransformerRegistry() {
        registry.put("Order", OrderDTO.class);
        registry.put("Payment", OrderDTO.class);
    }

//    public <T> MessageTransformer<T> getTransformer(Class<T> type) {
//        return (MessageTransformer<T>) transformerRegistry.get(type);
//    }

    public Class<?> getClassFromType(String type) {
        return registry.get(type);
    }
}
