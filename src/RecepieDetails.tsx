import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Recipe } from './Recepie';
import './RecepieDetails.css';

interface RecipeDetailsProps {
  recipes: Recipe[];
  onUpdateRecipe: (updatedRecipe: Recipe) => void;
  categories: string[];
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipes, onUpdateRecipe, categories }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Recipe | null>(recipe || null);
  const [shareMessage, setShareMessage] = useState('');

  if (!recipe || !formData) {
    return <p>Recept nem található.</p>;
  }

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setFormData(recipe);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = () => {
    if (formData) {
      onUpdateRecipe(formData);
      setIsEditing(false);
    }
  };

  const handleShare = () => {
    const baseUrl = 'https://kardosmate.github.io/Recept_app';
    const shareableLink = `${baseUrl}/dist/#/recipe/${id}`;

    navigator.clipboard.writeText(shareableLink).then(() => {
      setShareMessage('A link kimásolva a vágólapra!');
      setTimeout(() => setShareMessage(''), 3000);
    });
  };

  const handleSocialMediaShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const baseUrl = 'https://kardosmate.github.io/Recept_app';
    const shareableLink = `${baseUrl}/dist/#/recipe/${id}`;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `Nézd meg ezt a receptet: ${recipe.name}`
        )}&url=${encodeURIComponent(shareableLink)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `Nézd meg ezt a receptet: ${recipe.name} ${shareableLink}`
        )}`;
        break;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="recipe-details">
      <button className="back-button" onClick={() => navigate('/Recept_app/dist')}>
        Vissza
      </button>

      {isEditing ? (
        <form className="edit-form">
          <label>
            Név:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Összetevők:
            <textarea
              name="ingredients"
              value={formData.ingredients.join('\n')}
              onChange={(e) =>
                setFormData((prev) =>
                  prev ? { ...prev, ingredients: e.currentTarget.value.split('\n') } : null
                )
              }
            />
          </label>
          <label>
            Kategória:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Elkészítési idő (perc):
            <input
              type="number"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </label>
          <label>
            Leírás:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <div className="buttons">
            <button type="button" onClick={handleSave}>
              Mentés
            </button>
            <button type="button" onClick={handleEditToggle}>
              Mégse
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2>{recipe.name}</h2>
          <p>
            <strong>Összetevők:</strong> {recipe.ingredients.join(', ')}
          </p>
          <p>
            <strong>Kategória:</strong> {recipe.category}
          </p>
          <p>
            <strong>Elkészítési idő:</strong> {recipe.time} perc
          </p>
          <p>
            <strong>Leírás:</strong> {recipe.description}
          </p>

          <div className="share-section">
            <button className="edit-recipe" onClick={handleEditToggle}>
              Szerkesztés
            </button>
            <button className="share-button" onClick={handleShare}>
              Megosztás
            </button>
            <button
              className="share-facebook"
              onClick={() => handleSocialMediaShare('facebook')}
            >
              Megosztás Facebookon
            </button>
            <button
              className="share-twitter"
              onClick={() => handleSocialMediaShare('twitter')}
            >
              Megosztás Twitteren
            </button>
            <button
              className="share-whatsapp"
              onClick={() => handleSocialMediaShare('whatsapp')}
            >
              Megosztás WhatsApp-on
            </button>
          </div>

          {shareMessage && <p className="share-message">{shareMessage}</p>}
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
