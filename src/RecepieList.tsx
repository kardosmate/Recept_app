import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from './Recepie';
import './RecepieList.css';

interface RecipeListProps {
  recipes: Recipe[];
  onToggleFavorite: (id: string) => void;
  onRemoveRecipe: (id: string) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onToggleFavorite, onRemoveRecipe }) => {
  const navigate = useNavigate();

  const handleReadMore = (id: string) => {
    navigate(`/recipe/${id}`); // Navigálás a részletek oldalra
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
