CREATE TABLE IF NOT EXISTS stock (
    id UUID PRIMARY KEY,
    product_id uuid NOT NULL,
    quantity int8 NOT NULL,
    CONSTRAINT fk_product_id
        FOREIGN KEY (product_id)
            REFERENCES products(id)
)