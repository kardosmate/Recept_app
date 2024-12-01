import React from 'react';
import { useParams } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { Recipe } from './Recepie';

interface RecipeDetailsProps {
  recipes: Recipe[]; // A Recipe az interfész, amit már definiáltál.
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipes }) => {
  const { id } = useParams<{ id: string }>(); // Az URL-ből származtatjuk a recept azonosítóját.
  const recipe = recipes.find((r) => r.id === id); // Megkeressük az adott receptet.

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  const shareUrl = `${window.location.origin}/recipe/${recipe.id}`; // Az URL, amit megosztunk.

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <p><strong>Preparation Time:</strong> {recipe.time} minutes</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>

      <div className="share-buttons">
        <h3>Share this recipe:</h3>
        {/* FacebookShareButton without the quote property */}
        <FacebookShareButton url={shareUrl} hashtag="#recipe">
          <button className="facebook">Facebook</button>
        </FacebookShareButton>

        {/* TwitterShareButton with title property */}
        <TwitterShareButton url={shareUrl} title={`Check out this recipe: ${recipe.name}`}>
          <button className="twitter">Twitter</button>
        </TwitterShareButton>

        {/* WhatsappShareButton with title property */}
        <WhatsappShareButton url={shareUrl} title={`Check out this recipe: ${recipe.name}`}>
          <button className="whatsapp">WhatsApp</button>
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default RecipeDetails;
