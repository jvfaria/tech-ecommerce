package com.techecommerce.api.transformers;

import com.techecommerce.api.dtos.ImageDTO;
import com.techecommerce.api.models.Image;
import org.springframework.stereotype.Component;

@Component
public class ImageTransformer extends AbstractTransformer<Image, ImageDTO> {
    protected ImageTransformer() { super(Image.class, ImageDTO.class); }

}
