package com.techecommerce.main.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Getter
@Setter
public class OrderProductsId implements Serializable {
    @JsonProperty("product_id")
    private UUID productId;
    @JsonProperty("order_id")
    private UUID orderId;
}
