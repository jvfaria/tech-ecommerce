package com.techecommerce.main.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockDTO {
    private Long quantity;
    @JsonBackReference
    private ProductDTO product;
}
