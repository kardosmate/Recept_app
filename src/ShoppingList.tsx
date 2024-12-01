import React from 'react';
import { Recipe } from './Recepie';

interface ShoppingListProps {
  recipes: Recipe[];
  shoppingListRecipes: string[];
  onToggleShoppingList: (id: string) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  recipes,
  shoppingListRecipes,
  onToggleShoppingList,
}) => {
  const shoppingRecipes = recipes.filter((recipe) =>
    shoppingListRecipes.includes(recipe.id)
  );

  return (
    <div className="shopping-list">
      <h2>Bevásárlólista</h2>
      <ul>
        {shoppingRecipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p>Hozzávalók:</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <button onClick={() => onToggleShoppingList(recipe.id)}>
              Eltávolítás a bevásárlólistából
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
