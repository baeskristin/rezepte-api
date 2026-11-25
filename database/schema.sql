CREATE TABLE IF NOT EXISTS recipes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    minutes INT NOT NULL,
    servings INT NOT NULL,
    rating VARCHAR(50) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ingredients (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
    recipe_id BIGINT NOT NULL,
    ingredient_id INT NOT NULL,
    amount VARCHAR(255) NOT NULL,

    PRIMARY KEY (recipe_id, ingredient_id),

    FOREIGN KEY (recipe_id)
        REFERENCES recipes(id),

    FOREIGN KEY (ingredient_id)
        REFERENCES ingredients(id)
);

INSERT INTO recipes (id, title, minutes, servings, rating, price)
VALUES
    (1, 'Spaghetti Carbonara', 20, 2, '4 Stars', 1.50),
    (2, 'Pizza', 15, 1, '3 Stars', 3.50),
    (3, 'Chili Sin Carne', 40, 2, '5 Stars', 1.50),
    (4, 'Pasta Pan', 25, 3, '2 Stars', 2.00);

INSERT INTO ingredients (id, name)
VALUES
    (1, 'Spaghetti'),
    (2, 'Egg'),
    (3, 'Cheese'),
    (4, 'Tomato Sauce'),
    (5, 'Beans');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES
    (1, 1, '200 g'),
    (1, 2, '2 pieces'),
    (1, 3, '50 g'),

    (2, 4, '150 g'),
    
    (3, 5, '300 g');