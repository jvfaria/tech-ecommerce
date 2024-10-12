package com.techecommerce.messagingcore.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDefinitionDTO {
    private String messageType;
    private String exchange;
    private String queue;
    private String routingKey;
}
