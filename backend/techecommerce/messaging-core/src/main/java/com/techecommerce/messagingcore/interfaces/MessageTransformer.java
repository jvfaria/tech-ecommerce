package com.techecommerce.messagingcore.interfaces;


import com.techecommerce.messagingcore.dtos.ResultDTO;

public interface MessageTransformer<T> {
    ResultDTO<T> transform(String message);
}
