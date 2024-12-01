import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from './Recepie';
import RecipeForm from './RecepieForm';

interface RecepieEditProps {
  recipe: Recipe;
  categories: string[];
  onUpdateRecipe: (updatedRecipe: Recipe) => void;
}

const RecepieEdit: React.FC<RecepieEditProps> = ({ recipe, categories, onUpdateRecipe }) => {
  const navigate = useNavigate();

  const handleSubmit = (updatedRecipe: Recipe) => {
    onUpdateRecipe(updatedRecipe);
    navigate('/Recept_app/dist'); // Visszairányítás a főoldalra
  };

  return (
    <RecipeForm
      initialData={recipe}
      categories={categories}
      onSubmit={handleSubmit}
      submitButtonLabel="Recept módosítása"
    />
  );
};

export default RecepieEdit;
