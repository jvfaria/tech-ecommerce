package com.techecommerce.main.transformers;

import com.techecommerce.main.dto.ProductDTO;
import com.techecommerce.main.models.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductTransformer extends AbstractTransformer<Product, ProductDTO> {
    protected ProductTransformer() { super(Product.class, ProductDTO.class); }
}
