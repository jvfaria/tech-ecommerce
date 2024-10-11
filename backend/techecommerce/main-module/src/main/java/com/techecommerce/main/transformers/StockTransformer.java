package com.techecommerce.main.transformers;

import com.techecommerce.main.dtos.StockDTO;
import com.techecommerce.main.models.Stock;
import org.springframework.stereotype.Component;

@Component
public class StockTransformer extends AbstractTransformer<Stock, StockDTO> {
    protected StockTransformer() { super(Stock.class, StockDTO.class); }
}
