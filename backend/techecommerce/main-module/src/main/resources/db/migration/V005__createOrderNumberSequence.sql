CREATE SEQUENCE order_number_serial AS integer START 1 OWNED BY orders.order_number;

ALTER TABLE orders ALTER COLUMN order_number SET DEFAULT nextval('order_number_serial');