import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { Recipe } from './Recepie';
import Header from './Header';
import RecipeForm from './RecepieForm';
import RecipeList from './RecepieList';
import RecipeDetails from './RecepieDetails';
import Favorites from './Favorites';
import ShoppingList from './ShoppingList';
import SearchBar from './SearchBar';
import RecepieEdit from './RecepieEdit';

const App: React.FC = () => {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('recipes', []);
  const [shoppingList, setShoppingList] = useLocalStorage<string[]>('shoppingList', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Főételek', 'Desszertek', 'Előételek'];

  const addRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const updateRecipe = (updatedRecipe: Recipe) => {
    setRecipes(
      recipes.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe))
    );
  };

  const toggleFavorite = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  const addToShoppingList = (ingredients: string[]) => {
    setShoppingList([...shoppingList, ...ingredients]);
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
                onAddToShoppingList={addToShoppingList}
                onRemoveRecipe={removeRecipe}
              />
            </>
          }
        />
        <Route
          path="/Recept_app/dist/recipe/:id"
          element={
            <RecipeDetails
              recipes={recipes}
              onAddToShoppingList={addToShoppingList}
            />
          }
        />
        <Route
          path="/Recept_app/dist/new-recipe"
          element={<RecipeForm onSubmit={addRecipe} categories={categories} />}
        />
        <Route
          path="/Recept_app/dist/edit-recipe/:id"
          element={
            <EditRecipeWrapper
              recipes={recipes}
              categories={categories}
              onUpdateRecipe={updateRecipe}
            />
          }
        />
        <Route
          path="/Recept_app/dist/favorites"
          element={
            <Favorites recipes={filteredRecipes} onToggleFavorite={toggleFavorite} />
          }
        />
        <Route
          path="/Recept_app/dist/shopping-list"
          element={<ShoppingList recipes={recipes} />}
        />
      </Routes>
    </Router>
  );
};

// Wrapper for editing a recipe
const EditRecipeWrapper: React.FC<{
  recipes: Recipe[];
  categories: string[];
  onUpdateRecipe: (updatedRecipe: Recipe) => void;
}> = ({ recipes, categories, onUpdateRecipe }) => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <div>Recept nem található!</div>;
  }

  return (
    <RecepieEdit
      recipe={recipe}
      categories={categories}
      onUpdateRecipe={onUpdateRecipe}
    />
  );
};

export default App;
