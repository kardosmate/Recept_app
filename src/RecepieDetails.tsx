import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Recipe } from './Recepie';
import './RecepieDetails.css';

interface RecipeDetailsProps {
  recipes: Recipe[];
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipes }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <p>Recept nem található.</p>;
  }

  return (
    <div className="recipe-details">
      <button className="back-button" onClick={() => navigate('/Recept_app/dist')}>
        Vissza
      </button>

      <h2>{recipe.name}</h2>
      <p><strong>Összetevők:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Kategória:</strong> {recipe.category}</p>
      <p><strong>Elkészítési idő:</strong> {recipe.time} perc</p>
      <p><strong>Leírás:</strong> {recipe.description}</p>

      <button
        className="edit-recipe"
        onClick={() => navigate(`/Recept_app/dist/new-recipe?edit=${recipe.id}`)}
      >
        Szerkesztés
      </button>
    </div>
  );
};

export default RecipeDetails;
