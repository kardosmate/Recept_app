import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from './Recepie';
import './RecepieList.css';

interface RecipeListProps {
  recipes: Recipe[];
  onToggleFavorite: (id: string) => void;
  onAddToShoppingList: (ingredients: string[]) => void;
  onRemoveRecipe: (id: string) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  onToggleFavorite,
  onAddToShoppingList,
  onRemoveRecipe,
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
          <span
            className="shopping-list-icon"
            onClick={() => onAddToShoppingList(recipe.ingredients)}
            title="Hozzáadás a bevásárlólistához"
          >
            🗒
          </span>
          <h3>{recipe.name}</h3>
          <p className="recipe-category">Kategória: {recipe.category}</p>

          <button className="read-more" onClick={() => handleReadMore(recipe.id)}>
            Read more
          </button>

          <button className="delete-button" onClick={() => onRemoveRecipe(recipe.id)}>
            Törlés
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
