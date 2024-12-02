import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, categories: string[]) => void;
  categories: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, categories }) => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  /**
 * This component handles the user's search requirements, including the search query and selected categories.
 * @param {string} query - The search query provided by the user.
 * @param {string[]} categories - The selected categories to filter the search by.
 * @returns {void} - No return value.
 */
  const handleSearch = () => {
    onSearch(query, selectedCategories);
  };

  /**
 * Adds or removes a selected category from the filter list.
 * If the category is already selected, it will be removed; if not, it will be added.
 * @param {string} category - The name of the category to be added or removed.
 * @returns {void} - No return value.
 */
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Input mező változásának kezelése
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Keresés receptek között..."
        value={query}
        onChange={handleInputChange}
      />
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={selectedCategories.includes(category) ? 'selected' : ''}
          >
            {category}
          </button>
        ))}
      </div>
      <button onClick={handleSearch}>Keresés</button>
    </div>
  );
};

export default SearchBar;
