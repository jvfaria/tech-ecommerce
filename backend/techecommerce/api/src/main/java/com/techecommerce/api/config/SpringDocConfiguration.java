package com.techecommerce.api.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpringDocConfiguration implements WebMvcConfigurer {

    private final String projectVersion = "v1";

    @Bean
    public GroupedOpenApi api() {
        return GroupedOpenApi.builder()
                .group("Tech-ecommerce API")
                .pathsToMatch("/**") // Adjust the path as necessary
                .build();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Springdoc OpenAPI serves Swagger UI by default
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
