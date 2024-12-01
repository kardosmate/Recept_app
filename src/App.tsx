import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { Recipe } from './Recepie';
import Header from './Header';
import RecipeForm from './RecepieForm';
import RecipeList from './RecepieList';
import RecipeDetails from './RecepieDetails';
import Favorites from './Favorites';
import ShoppingList from './ShoppingList';
import SearchBar from './SearchBar';

const App: React.FC = () => {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('recipes', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
    setSelectedCategories(categories);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesQuery =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(recipe.category);

    return matchesQuery && matchesCategory;
  });

  // Wrapper component for navigation handling
  const HeaderWithNavigation: React.FC = () => {
    const navigate = useNavigate();
    return (
      <Header
        onNavigate={(page) => {
          switch (page) {
            case 'recept-lista':
              navigate('#/'); // Navigálás a recept lista oldalra
              break;
            case 'uj-recept':
              navigate('#/new-recipe'); // Navigálás az új recept oldalra
              break;
            case 'kedvencek':
              navigate('#/favorites'); // Navigálás a kedvencek oldalra
              break;
            case 'bevásárló-lista':
              navigate('#/shopping-list'); // Navigálás a bevásárló lista oldalra
              break;
            default:
              navigate('#/'); // Alapértelmezett navigálás
          }
        }}
      />
    );
  };

  return (
    <Router>
      <HeaderWithNavigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar onSearch={handleSearch} categories={categories} />
              <RecipeList
                recipes={filteredRecipes}
                onToggleFavorite={toggleFavorite}
                onRemoveRecipe={removeRecipe}
              />
            </>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetails recipes={recipes} />} />
        <Route path="/new-recipe" element={<RecipeForm onAddRecipe={addRecipe} categories={categories} />} />
        <Route path="/favorites" element={<Favorites recipes={filteredRecipes} onToggleFavorite={toggleFavorite} />} />
        <Route path="/shopping-list" element={<ShoppingList recipes={filteredRecipes} />} />
      </Routes>
    </Router>
  );
};

export default App;
