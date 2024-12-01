import React, { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Recipe } from './Recepie';
import Header from './Header';
import RecipeForm from './RecepieForm';
import RecipeList from './RecepieList';
import Favorites from './Favorites';
import ShoppingList from './ShoppingList';
import SearchBar from './SearchBar';

const App: React.FC = () => {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('recipes', []);
  const [currentPage, setCurrentPage] = useState('recept-lista'); // Default: ReceptLista
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Több kategória kiválasztása

  const categories = ['Főételek', 'Desszertek', 'Előételek'];

  const addRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const toggleFavorite = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  const removeRecipe = (id: string) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleSearch = (query: string, categories: string[]) => {
    setSearchQuery(query);
    setSelectedCategories(categories); // Több kategória kezelése
  };

  const filteredRecipes = recipes.filter((recipe) => {
    // Keresési feltétel (név és összetevők)
    const matchesQuery =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Kategóriák szűrése
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(recipe.category);

    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <Header onNavigate={setCurrentPage} />

      {/* Oldalak megjelenítése */}
      {currentPage === 'recept-lista' && (
        <>
          <SearchBar onSearch={handleSearch} categories={categories} />
          <RecipeList
            recipes={filteredRecipes}
            onToggleFavorite={toggleFavorite}
            onRemoveRecipe={removeRecipe}
          />
        </>
      )}

      {currentPage === 'uj-recept' && (
        <RecipeForm onAddRecipe={addRecipe} categories={categories} />
      )}

      {currentPage === 'kedvencek' && (
        <Favorites recipes={filteredRecipes} onToggleFavorite={toggleFavorite} />
      )}

      {currentPage === 'bevásárló-lista' && (
        <ShoppingList recipes={filteredRecipes} />
      )}
    </div>
  );
};

export default App;
