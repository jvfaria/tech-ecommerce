package com.techecommerce.messagingcore.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MessageDTO {
    private String type;
    private String payload;
}
