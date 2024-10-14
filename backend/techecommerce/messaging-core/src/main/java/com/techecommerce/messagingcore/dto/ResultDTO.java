package com.techecommerce.messagingcore.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultDTO<T> extends AbstractMessageDTO<T> {
    public String errorMessage;

    public boolean isSuccess() {
        return errorMessage == null;
    }

    public ResultDTO(T payload) {
        setPayload(payload);
        this.errorMessage = null;
    }

    public ResultDTO(String errorMessage) {
        setPayload(null);
        this.errorMessage = errorMessage;
    }
}
