package com.techecommerce.main.transformers;

import com.techecommerce.main.dtos.ImageDTO;
import com.techecommerce.main.models.Image;
import org.springframework.stereotype.Component;

@Component
public class ImageTransformer extends AbstractTransformer<Image, ImageDTO> {
    protected ImageTransformer() { super(Image.class, ImageDTO.class); }

}
