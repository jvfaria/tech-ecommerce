package com.techecommerce.messagingcore.configs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties
@Getter
@Setter
public class RabbitMQConfig {
    @Value("${app.rabbitmq.exchange.order-exchange}")
    private String orderExchange;

    @Value("${app.rabbitmq.queues.order-queue}")
    private String orderQueue;

    @Value("${app.rabbitmq.routing-keys.order}")
    private String orderRoutingKey;


    @Bean
    Queue queue() {
        return new Queue(orderQueue, false);
    }

    @Bean
    TopicExchange exchange() {
        return new TopicExchange(orderExchange, true, false);
    }

    @Bean
    Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(orderRoutingKey);
    }
}
