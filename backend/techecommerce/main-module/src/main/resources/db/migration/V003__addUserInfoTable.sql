CREATE TABLE IF NOT EXISTS user_info (
     id UUID PRIMARY KEY,
     avatar varchar(255) NULL,
     name varchar(255) NULL,
     cpf varchar(255) NULL,
     user_id UUID NOT NULL,
     CONSTRAINT fk_user_id
         FOREIGN KEY (user_id)
             REFERENCES users(id)
);
