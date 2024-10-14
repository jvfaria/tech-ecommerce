package com.techecommerce.main.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private UUID id;
    private String name;
    private String description;
    private BigDecimal price;
    private Boolean featured;
    private BrandDTO brand;
    private CategoryDTO category;
    private ImageDTO image;
    @JsonManagedReference
    private StockDTO stock;
}
