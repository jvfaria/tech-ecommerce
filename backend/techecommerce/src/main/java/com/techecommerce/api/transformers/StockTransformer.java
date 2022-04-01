package com.techecommerce.api.transformers;

import com.techecommerce.api.dtos.StockDTO;
import com.techecommerce.api.models.Stock;
import org.springframework.stereotype.Component;

@Component
public class StockTransformer extends AbstractTransformer<Stock, StockDTO> {
    protected StockTransformer() { super(Stock.class, StockDTO.class); }
}
