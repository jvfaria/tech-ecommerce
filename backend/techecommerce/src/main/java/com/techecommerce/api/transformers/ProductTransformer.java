package com.techecommerce.api.transformers;

import com.techecommerce.api.dtos.ProductDTO;
import com.techecommerce.api.models.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductTransformer extends AbstractTransformer<Product, ProductDTO> {
    protected ProductTransformer() { super(Product.class, ProductDTO.class); }
}
