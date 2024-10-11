CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY,
    order_number SERIAL NOT NULL,
    customer UUID NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_user_id
        FOREIGN KEY (customer)
            REFERENCES user_info(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_products (
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity int NOT NULL,
    PRIMARY KEY (order_id, product_id)
)