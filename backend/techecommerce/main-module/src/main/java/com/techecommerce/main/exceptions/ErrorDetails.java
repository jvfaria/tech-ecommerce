package com.techecommerce.main.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ErrorDetails {
    private String timestamp;
    private Integer status;
    private String error;
    private String path;
    private String message;
}
