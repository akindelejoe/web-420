const express = require("express");
const app = express();

app.use(express.json());

const recipes = [
  { id: 1, name: "Jollof Rice", ingredients: ["rice", "tomato", "pepper"] },
  { id: 2, name: "Egusi Soup", ingredients: ["egusi", "palm oil", "meat"] }
];

app.put("/api/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const recipe = recipes.find(r => r.id === id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  const recipeToUpdate = req.body;

  if (!recipeToUpdate.name || !recipeToUpdate.ingredients) {
    return res.status(400).json({ message: "Missing name or ingredients" });
  }

  recipe.name = recipeToUpdate.name;
  recipe.ingredients = recipeToUpdate.ingredients;

  res.status(200).json(recipe);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
