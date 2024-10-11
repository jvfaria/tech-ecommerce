package com.techecommerce.main.dtos;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockDTO {
    private Long quantity;
    @JsonBackReference
    private ProductDTO product;
}
