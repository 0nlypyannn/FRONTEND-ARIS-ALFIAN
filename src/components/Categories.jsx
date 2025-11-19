// src/components/Categories.jsx
import React from 'react';

const Categories = ({ onCategorySelect, activeCategory }) => {
  const categories = ['All', 'Pizza', 'Minuman', 'Donut'];

  return (
    <div className="flex justify-center gap-4 my-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`py-2 px-4 rounded-full font-semibold transition-colors 
            ${activeCategory === category 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white'
            }`
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;