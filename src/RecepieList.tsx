import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from './Recepie';
import './RecepieList.css';

interface RecipeListProps {
  recipes: Recipe[];
  onToggleFavorite: (id: string) => void;
  onToggleShoppingList: (id: string) => void;
  onRemoveRecipe: (id: string) => void;
  shoppingListRecipes: string[]; // Add the shopping list state
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  onToggleFavorite,
  onToggleShoppingList,
  onRemoveRecipe,
  shoppingListRecipes
}) => {
  const navigate = useNavigate();

  const handleReadMore = (id: string) => {
    navigate(`/Recept_app/dist/recipe/${id}`);
  };

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="recipe-card">
          <span
            className={`favorite-icon ${recipe.isFavorite ? 'filled' : ''}`}
            onClick={() => onToggleFavorite(recipe.id)}
            title={recipe.isFavorite ? 'Távolítás a kedvencekből' : 'Hozzáadás a kedvencekhez'}
          >
            ★
          </span>
          <h3>{recipe.name}</h3>
          <p className="recipe-category">Kategória: {recipe.category}</p>

          <button className="read-more" onClick={() => handleReadMore(recipe.id)}>
            Részletek
          </button>

          <button className="delete-button" onClick={() => onRemoveRecipe(recipe.id)}>
            Törlés
          </button>

          {/* Shopping list button */}
          <span
            className={`shopping-list-icon ${shoppingListRecipes.includes(recipe.id) ? 'added' : ''}`}
            onClick={() => onToggleShoppingList(recipe.id)}
            title={shoppingListRecipes.includes(recipe.id) ? 'Eltávolítás a bevásárlólistából' : 'Hozzáadás a bevásárlólistához'}
          >
            {shoppingListRecipes.includes(recipe.id) ? '➖' : '🛒'}
          </span>
        </li>
      ))}

      {/* Floating button at the bottom-right */}
      <button
        className="shopping-list-toggle"
        onClick={() => navigate('/Recept_app/dist/shopping-list')}
      >
        Bevásárlólista
      </button>
    </ul>
  );
};

export default RecipeList;
