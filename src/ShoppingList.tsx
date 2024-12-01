import React, { useState } from 'react';
import { Recipe } from './Recepie';

interface ShoppingListProps {
  recipes: Recipe[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ recipes }) => {
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  const toggleRecipeSelection = (id: string) => {
    setSelectedRecipes((prev) =>
      prev.includes(id) ? prev.filter((recipeId) => recipeId !== id) : [...prev, id]
    );
  };

  const generateShoppingList = () => {
    const ingredients = recipes
      .filter((recipe) => selectedRecipes.includes(recipe.id))
      .flatMap((recipe) => recipe.ingredients);
    setShoppingList(Array.from(new Set(ingredients))); // Egyedi hozzávalók
  };

  return (
    <div>
      <h2>Bevásárlólista</h2>
      <h3>Receptek kiválasztása</h3>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedRecipes.includes(recipe.id)}
                onChange={() => toggleRecipeSelection(recipe.id)}
              />
              {recipe.name}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={generateShoppingList}>Lista generálása</button>
      <h3>Hozzávalók</h3>
      <ul>
        {shoppingList.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
