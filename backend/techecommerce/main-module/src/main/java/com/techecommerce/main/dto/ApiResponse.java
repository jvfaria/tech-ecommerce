package com.techecommerce.main.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private T data;
    private String error;
    private String message;

    public ApiResponse(T data) {
        this.data = data;
    }

    public ApiResponse(String error, String message) {
        this.error = error;
        this.message = message;
    }
}
