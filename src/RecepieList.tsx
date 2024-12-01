import React, { useState } from 'react';
import { Recipe } from './Recepie';
import './RecepieList.css';

interface RecipeListProps {
  recipes: Recipe[];
  onToggleFavorite: (id: string) => void;
  onRemoveRecipe: (id: string) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onToggleFavorite, onRemoveRecipe }) => {
  const [expandedRecipeIds, setExpandedRecipeIds] = useState<Set<string>>(new Set());
  const [shareMenuOpenId, setShareMenuOpenId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setExpandedRecipeIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const openShareMenu = (id: string) => {
    setShareMenuOpenId((prev) => (prev === id ? null : id));
  };

  const shareRecipe = (platform: string, recipe: Recipe) => {
    const message = `Recept neve: ${recipe.name}\nÖsszetevők: ${recipe.ingredients.join(', ')}\nLeírás: ${recipe.description}`;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
      case 'instagram':
        alert('Az Instagram nem támogatja a közvetlen megosztást böngészőn keresztül, de bemásolhatod a receptet!');
        return;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Egy szuper receptet találtam!')}&body=${encodeURIComponent(message)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => {
        const isExpanded = expandedRecipeIds.has(recipe.id);
        const isShareMenuOpen = shareMenuOpenId === recipe.id;

        return (
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

            <button className="read-more" onClick={() => toggleDetails(recipe.id)}>
              {isExpanded ? 'Show less' : 'Read more'}
            </button>

            <button className="delete-button" onClick={() => onRemoveRecipe(recipe.id)}>
              Törlés
            </button>

            <button className="share-button" onClick={() => openShareMenu(recipe.id)}>
              {isShareMenuOpen ? 'Bezárás' : 'Megosztás'}
            </button>

            {isShareMenuOpen && (
              <div className="share-menu">
                <p>Oszd meg itt:</p>
                <button onClick={() => shareRecipe('facebook', recipe)}>Facebook</button>
                <button onClick={() => shareRecipe('twitter', recipe)}>Twitter</button>
                <button onClick={() => shareRecipe('instagram', recipe)}>Instagram</button>
                <button onClick={() => shareRecipe('email', recipe)}>E-mail</button>
              </div>
            )}

            {isExpanded && (
              <div>
                <p><strong>Összetevők:</strong> {recipe.ingredients.join(', ')}</p>
                <p><strong>Elkészítési idő:</strong> {recipe.time} perc</p>
                <p><strong>Leírás:</strong> {recipe.description}</p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default RecipeList;
