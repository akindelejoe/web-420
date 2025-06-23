/**
 * Title: Assignment 4.2 - JSON Web Service
 * Author: Joe Akindele
 * Date: 06/22/2025
 * Description: JSON Web Service using Express
 */

const express = require('express');
const app = express();
const port = 3000;

const recipes = [
  { id: 1, name: "Jollof Rice", ingredients: ["rice", "tomato", "pepper"] },
  { id: 2, name: "Egusi Soup", ingredients: ["melon seeds", "vegetable", "meat"] },
  { id: 3, name: "Ofada Sauce", ingredients: ["ata rodo", "palm oil", "assorted"] },
];

// GET all recipes
app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

// GET recipe by ID
app.get("/api/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    const err = new Error("Input must be a number");
    err.status = 400;
    return res.status(400).json({ message: err.message });
  }

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  res.json(recipe);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
