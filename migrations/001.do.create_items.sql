DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    imgsrc VARCHAR(10000) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
);