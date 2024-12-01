import React from 'react';

interface ShoppingListProps {
  items: string[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items }) => {
  if (items.length === 0) {
    return <p>A bevásárlólista üres.</p>;
  }

  return (
    <div className="shopping-list">
      <h2>Bevásárlólista</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
