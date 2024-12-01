import React, { useState } from 'react';
import { Recipe } from './Recepie';

interface RecipeFormProps {
  onAddRecipe: (recipe: Recipe) => void;
  categories: string[]; // Az elérhető kategóriák listája
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe, categories }) => {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>(categories[0] || ''); // Alapértelmezett kategória
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.currentTarget.value);
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!name || !ingredients || !time || !description || !category) {
      setError('Minden mezőt ki kell tölteni.');
      return;
    }

    const newRecipe: Recipe = {
      id: Date.now().toString(),
      name,
      ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
      time,
      description,
      category,
      isFavorite: false,
    };

    onAddRecipe(newRecipe);

    // Reset form state
    setName('');
    setIngredients('');
    setTime('');
    setDescription('');
    setCategory(categories[0] || ''); // Reset to first category
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        placeholder="Recept neve"
        value={name}
        onChange={handleInputChange(setName)}
        required
      />
      <textarea
        placeholder="Összetevők (vesszővel elválasztva)"
        value={ingredients}
        onChange={handleInputChange(setIngredients)}
        required
      />
      <input
        type="text"
        placeholder="Elkészítési idő (percben)"
        value={time}
        onChange={handleInputChange(setTime)}
        required
      />
      <textarea
        placeholder="Leírás"
        value={description}
        onChange={handleInputChange(setDescription)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.currentTarget.value)}
        required
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit">Recept hozzáadása</button>
    </form>
  );
};

export default RecipeForm;
