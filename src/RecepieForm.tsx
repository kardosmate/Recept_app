import React, { useState } from 'react';
import { Recipe } from './Recepie';

interface RecipeFormProps {
  onSubmit: (recipe: Recipe) => void;
  categories: string[]; // Az elérhető kategóriák listája
  initialData?: Recipe; // Opcionális, meglévő adatok módosításkor
  submitButtonLabel?: string; // Gomb felirat (pl. Recept hozzáadása vagy Recept módosítása)
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  onSubmit,
  categories,
  initialData,
  submitButtonLabel = 'Recept hozzáadása',
}) => {
  const [name, setName] = useState<string>(initialData?.name || '');
  const [ingredients, setIngredients] = useState<string>(
    initialData?.ingredients.join(', ') || ''
  );
  const [time, setTime] = useState<string>(initialData?.time || '');
  const [description, setDescription] = useState<string>(initialData?.description || '');
  const [category, setCategory] = useState<string>(initialData?.category || categories[0] || '');
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
      id: initialData?.id || Date.now().toString(),
      name,
      ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
      time,
      description,
      category,
      isFavorite: initialData?.isFavorite || false,
    };

    onSubmit(newRecipe);

    if (!initialData) {
      // Reset form state only for new recipes
      setName('');
      setIngredients('');
      setTime('');
      setDescription('');
      setCategory(categories[0] || '');
      setError(null);
    }
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
      <button type="submit">{submitButtonLabel}</button>
    </form>
  );
};

export default RecipeForm;
