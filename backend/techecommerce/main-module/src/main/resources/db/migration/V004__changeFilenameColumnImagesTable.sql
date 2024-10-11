ALTER TABLE images
    DROP COLUMN filename;
ALTER TABLE images
    RENAME COLUMN file_name TO filepath;