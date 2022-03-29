package com.techecommerce.api.transformers;

import com.techecommerce.api.dtos.BrandDTO;
import com.techecommerce.api.dtos.CategoryDTO;
import com.techecommerce.api.dtos.ImageDTO;
import com.techecommerce.api.models.Brand;
import com.techecommerce.api.models.Category;
import com.techecommerce.api.models.Image;

public class ImageTransformer extends AbstractTransformer<Image, ImageDTO> {
    protected ImageTransformer() { super(Image.class, ImageDTO.class); }

}
