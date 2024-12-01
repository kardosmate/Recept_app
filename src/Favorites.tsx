import React from 'react';
import { Recipe } from './Recepie';

interface FavoritesProps {
  recipes: Recipe[];
  onToggleFavorite: (id: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ recipes, onToggleFavorite }) => {
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  return (
    <div>
      <h2>Kedvencek</h2>
      {favoriteRecipes.length > 0 ? (
        <ul>
          {favoriteRecipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.name}</h3>
              <button onClick={() => onToggleFavorite(recipe.id)}>
                Eltávolítás a kedvencekből
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nincsenek kedvencek</p>
      )}
    </div>
  );
};

export default Favorites;
