package com.techecommerce.api.transformers;

import com.techecommerce.api.dtos.CategoryDTO;
import com.techecommerce.api.models.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryTransformer extends AbstractTransformer<Category, CategoryDTO> {
    protected CategoryTransformer() { super(Category.class, CategoryDTO.class); }
}
