package com.techecommerce.api.transformers;

import com.techecommerce.api.dtos.BrandDTO;
import com.techecommerce.api.models.Brand;
import org.springframework.stereotype.Component;

@Component
public class BrandTransformer extends AbstractTransformer<Brand, BrandDTO> {
    protected BrandTransformer() { super(Brand.class, BrandDTO.class); }
}
