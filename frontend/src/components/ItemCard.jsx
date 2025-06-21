// src/components/ItemCard.js
import React from 'react';

const ItemCard = ({ item, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 group"
      onClick={() => onClick(item)}
    >
      <div className="h-56 overflow-hidden">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${item.coverImage}`}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
      </div>
    </div>
  );
};

export default ItemCard;