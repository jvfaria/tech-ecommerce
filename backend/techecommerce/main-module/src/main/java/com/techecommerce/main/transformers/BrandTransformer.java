package com.techecommerce.main.transformers;

import com.techecommerce.main.dto.BrandDTO;
import com.techecommerce.main.models.Brand;
import org.springframework.stereotype.Component;

@Component
public class BrandTransformer extends AbstractTransformer<Brand, BrandDTO> {
    protected BrandTransformer() { super(Brand.class, BrandDTO.class); }
}
