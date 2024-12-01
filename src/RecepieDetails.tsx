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

  const shareRecipe = (platform: string) => {
    const recipeUrl = `${window.location.origin}/recipe/${recipe.id}`;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(recipeUrl)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Egy szuper receptet találtam!')}&body=${encodeURIComponent(recipeUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="recipe-details">
      <button className="back-button" onClick={() => navigate('/')}>
        Vissza
      </button>

      <h2>{recipe.name}</h2>
      <p><strong>Összetevők:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Kategória:</strong> {recipe.category}</p>
      <p><strong>Elkészítési idő:</strong> {recipe.time} perc</p>
      <p><strong>Leírás:</strong> {recipe.description}</p>

      <div className="share-menu">
        <p>Oszd meg itt:</p>
        <button onClick={() => shareRecipe('facebook')}>Facebook</button>
        <button onClick={() => shareRecipe('twitter')}>Twitter</button>
        <button onClick={() => shareRecipe('email')}>E-mail</button>
      </div>
    </div>
  );
};

export default RecipeDetails;
