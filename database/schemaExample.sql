CREATE TABLE IF NOT EXISTS recipes (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titel VARCHAR(255) NOT NULL,
    minutes BIGINT NOT NULL,
    servings BIGINT NOT NULL,
    vegetarian BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ingredients (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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

-- 1) Recipes

INSERT INTO recipes (titel, minutes, servings, vegetarian)
VALUES
    ('Spaghetti Carbonara', 20, 2, FALSE),
    ('Lentil Curry', 35, 4, TRUE);

-- 2) Ingredients

INSERT INTO ingredients (name)
VALUES
    ('Spaghetti'),
    ('Egg'),
    ('Bacon'),
    ('Lentils'),
    ('Coconut Milk'),
    ('Onion');

-- 3) Recipe-Ingredients

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES
    (1, 1, '200 g'),    
    (1, 2, '2 pieces'), 
    (1, 3, '100 g'),      
    (2, 4, '250 g'),    
    (2, 5, '400 ml'),   
    (2, 6, '1 piece');   

-- 4) Own Recipe

INSERT INTO recipes (titel, minutes, servings, vegetarian)
VALUES
    ('Tomato Mozzarella Salad', 10, 2, TRUE);

INSERT INTO ingredients (name)
VALUES
    ('Tomato'),
    ('Mozzarella'),
    ('Basil');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount)
VALUES
    (3, 7, '2 pieces'),
    (3, 8, '125 g'),
    (3, 9, '10 leaves');


SELECT * FROM recipes;
SELECT * FROM ingredients;
SELECT * FROM recipe_ingredients;

-- Read data
SELECT r.titel, i.name, ri.amount
FROM recipes r
JOIN recipe_ingredients ri ON ri.recipe_id = r.id
JOIN ingredients i ON i.id = ri.ingredient_id
WHERE r.id = 1;

-- Change and delete
UPDATE recipes SET servings = 6 WHERE titel = 'Lentil Curry';
SELECT * FROM recipes;
DELETE FROM recipe_ingredients WHERE recipe_id = 1;