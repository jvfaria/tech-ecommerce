package com.techecommerce.messagingcore.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractMessageDTO<T> {
    private String type;
    private T payload;
}
