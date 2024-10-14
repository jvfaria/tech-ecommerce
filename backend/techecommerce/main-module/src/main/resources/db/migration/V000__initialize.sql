CREATE TABLE IF NOT EXISTS users (
     id UUID PRIMARY KEY,
     username VARCHAR(45) NOT NULL,
     email VARCHAR(45) NOT NULL,
     password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID,
    role_id BIGINT,
    CONSTRAINT fk_user_id
      FOREIGN KEY (user_id)
          REFERENCES users(id),
    CONSTRAINT fk_roles_id
      FOREIGN KEY (role_id)
          REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY,
    name VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY,
    name VARCHAR(55) NOT NULL
);

CREATE TABLE IF NOT EXISTS images (
    id UUID PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    filepath VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_id UUID,
    category_id UUID NOT NULL,
    brand_id UUID NOT NULL,
    price DECIMAL(15,2) DEFAULT (0.00),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_category_id
        FOREIGN KEY (category_id)
            REFERENCES categories(id),
    CONSTRAINT fk_brand_id
        FOREIGN KEY (brand_id)
            REFERENCES brands(id),
    CONSTRAINT fk_image_id
        FOREIGN KEY (image_id)
            REFERENCES images(id)
);
