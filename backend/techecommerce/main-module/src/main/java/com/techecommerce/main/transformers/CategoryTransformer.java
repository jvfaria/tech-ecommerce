package com.techecommerce.main.transformers;

import com.techecommerce.main.dto.CategoryDTO;
import com.techecommerce.main.models.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryTransformer extends AbstractTransformer<Category, CategoryDTO> {
    protected CategoryTransformer() { super(Category.class, CategoryDTO.class); }
}
