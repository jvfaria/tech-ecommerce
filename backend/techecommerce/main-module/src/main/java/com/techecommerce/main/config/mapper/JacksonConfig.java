package com.techecommerce.main.config.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper mapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        objectMapper.writer().withDefaultPrettyPrinter();
        objectMapper.registerModule(new JavaTimeModule());

        return objectMapper;
    }
}
