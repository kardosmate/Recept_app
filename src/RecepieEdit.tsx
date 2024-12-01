import React, { useState, useEffect } from 'react';
import { Recipe } from './Recepie';

interface RecepieEditProps {
  recipe: Recipe;
  categories: string[];
  onUpdateRecipe: (updatedRecipe: Recipe) => void;
}

const RecepieEdit: React.FC<RecepieEditProps> = ({
  recipe,
  categories,
  onUpdateRecipe,
}) => {
  const [name, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(', '));
  const [time, setPrepTime] = useState(recipe.time);
  const [description, setDescription] = useState(recipe.description);
  const [category, setCategory] = useState(recipe.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRecipe: Recipe = {
      ...recipe,
      name,
      ingredients: ingredients.split(',').map((ing) => ing.trim()),
      time,
      description,
      category,
    };
    onUpdateRecipe(updatedRecipe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Recept neve"
      />
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.currentTarget.value)}
        placeholder="Összetevők (vesszővel elválasztva)"
      />
      <input
        type="number"
        value={time}
        onChange={(e) => setPrepTime(e.currentTarget.value)}
        placeholder="Elkészítési idő (percben)"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        placeholder="Leírás"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.currentTarget.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit">Recept módosítása</button>
    </form>
  );
};

export default RecepieEdit;
