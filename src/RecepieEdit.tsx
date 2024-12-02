import React, { useState } from 'react';
import { Recipe } from './Recepie';

interface RecepieEditProps {
  recipe: Recipe;
  categories: string[];
  onUpdateRecipe: (updatedRecipe: Recipe) => void;
}

const RecepieEdit: React.FC<RecepieEditProps> = ({ recipe, categories, onUpdateRecipe }) => {
  const [formData, setFormData] = useState<Recipe>({ ...recipe });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRecipe(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Recept szerkesztése</h2>
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
        Hozzávalók:
        <textarea
          name="ingredients"
          value={formData.ingredients.join('\n')}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              ingredients: e.currentTarget.value.split('\n'),
            }))
          }
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
      <label>
        Elkészítési idő (perc):
        <input
          type="number"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Mentés</button>
    </form>
  );
};

export default RecepieEdit;
