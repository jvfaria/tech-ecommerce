package com.techecommerce.messagingcore.interfaces;


import com.techecommerce.messagingcore.dto.ResultDTO;

public interface MessageTransformer<T> {
    ResultDTO<T> transform(String message);
}
