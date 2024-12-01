import React from 'react';
import { Recipe } from './Recepie';

interface ShoppingListProps {
  recipes: Recipe[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ recipes }) => {
  const allIngredients = recipes.flatMap((recipe) => recipe.ingredients);
  const uniqueIngredients = Array.from(new Set(allIngredients));

  return (
    <div>
      <h2>Bevásárlólista</h2>
      {uniqueIngredients.length > 0 ? (
        <ul>
          {uniqueIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <p>Nincs összetevő</p>
      )}
    </div>
  );
};

export default ShoppingList;
