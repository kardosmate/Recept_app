import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
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
  const [shoppingListRecipes, setShoppingListRecipes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Főételek', 'Desszertek', 'Előételek'];

  /**
   * Adds a new recipe to the 'recipes' state
   * @param {Recipe} recipe - The new recipe to be added
   */
  const addRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
  };

  /**
   * Updates an existing recipe in the 'recipes' state
   * @param {Recipe} updatedRecipe - The recipe with updated values
   */
  const updateRecipe = (updatedRecipe: Recipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

   /**
   * Toggles the 'isFavorite' status of a recipe
   * @param {string} id - The ID of the recipe to toggle the favorite status
   */
  const toggleFavorite = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  /**
   * Adds or removes a recipe from the shopping list
   * @param {string} id - The ID of the recipe to toggle in the shopping list
   */
  const toggleShoppingList = (id: string) => {
    setShoppingListRecipes((prev) =>
      prev.includes(id) ? prev.filter((recipeId) => recipeId !== id) : [...prev, id]
    );
  };

  /**
   * Removes a recipe from the 'recipes' state
   * @param {string} id - The ID of the recipe to remove
   */
  const removeRecipe = (id: string) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

   /**
   * Handles the search query and selected categories, and updates the state
   * @param {string} query - The search query entered by the user
   * @param {string[]} categories - The selected categories for filtering
   */
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

  const HeaderWithNavigation: React.FC = () => {
    const navigate = useNavigate();
    return (
      <Header
        onNavigate={(page) => {
          switch (page) {
            case 'recept-lista':
              navigate('/Recept_app/dist');
              break;
            case 'uj-recept':
              navigate('/Recept_app/dist/new-recipe');
              break;
            case 'kedvencek':
              navigate('/Recept_app/dist/favorites');
              break;
            case 'bevásárló-lista':
              navigate('/Recept_app/dist/shopping-list');
              break;
            default:
              navigate('/Recept_app/dist');
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
          path="/Recept_app/dist"
          element={
            <>
              <SearchBar onSearch={handleSearch} categories={categories} />
              <RecipeList
                recipes={filteredRecipes}
                onToggleFavorite={toggleFavorite}
                onToggleShoppingList={toggleShoppingList}
                onRemoveRecipe={removeRecipe}
                shoppingListRecipes={shoppingListRecipes}
              />
            </>
          }
        />
        <Route
          path="/Recept_app/dist/recipe/:id"
          element={
            <RecipeDetails
              recipes={recipes}
              categories={categories}
              onUpdateRecipe={updateRecipe}
            />
          }
        />
        <Route
          path="/Recept_app/dist/new-recipe"
          element={<RecipeForm onSubmit={addRecipe} categories={categories} />}
        />
        <Route
          path="/Recept_app/dist/favorites"
          element={
            <Favorites recipes={filteredRecipes} onToggleFavorite={toggleFavorite} />
          }
        />
        <Route
          path="/Recept_app/dist/shopping-list"
          element={
            <ShoppingList
              recipes={recipes}
              shoppingListRecipes={shoppingListRecipes}
              onToggleShoppingList={toggleShoppingList}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
