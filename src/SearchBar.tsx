import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, categories: string[]) => void;
  categories: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, categories }) => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearch = () => {
    onSearch(query, selectedCategories);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Ha már kiválasztott, eltávolítjuk
        : [...prev, category] // Ha még nincs kiválasztva, hozzáadjuk
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value); // Frissítjük a keresési kulcsszót
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
