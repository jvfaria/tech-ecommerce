package com.techecommerce.messagingcore.configs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ObjectMapperConfig {
    ObjectMapper objectMapper;

    @Bean
    public ObjectMapper objectMapper() {
        objectMapper = new ObjectMapper();
        objectMapper.writer().withDefaultPrettyPrinter();
        objectMapper.registerModule(new JavaTimeModule());

        return objectMapper;
    }
}
