// src/components/Header.js
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-indigo-600" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Itemify</h1>
        </div>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            View Items
          </Link>
          <Link
            to="/add"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Add Item
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
