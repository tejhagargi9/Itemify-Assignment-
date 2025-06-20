// src/pages/ViewItems.js
import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import { Loader2, AlertTriangle } from 'lucide-react';

const ViewItems = () => {
  // Get both items and the new setItems function from the context
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Add loading and error states for the API call
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // useEffect will run once when the component mounts, thanks to the empty dependency array []
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Assuming your getItems route is mounted at /api/items
        const response = await fetch(`${BACKEND_URL}/getItems`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setItems(data); // Update the global context with the fetched items
      } catch (err) {
        setError('Failed to fetch items. Please try refreshing the page.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [setItems]); // Add setItems to the dependency array (good practice)

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Helper function to render content based on state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-16">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="text-xl">Loading Items...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-red-500 mt-16 bg-red-50 p-8 rounded-lg">
          <AlertTriangle className="w-12 h-12 mb-4" />
          <p className="text-xl font-semibold">{error}</p>
        </div>
      );
    }

    if (items.length === 0) {
      return <p className="text-center text-gray-500 mt-16 text-xl">No items have been added yet.</p>;
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          // Use item._id from MongoDB as the key for better reliability
          <ItemCard key={item._id} item={item} onClick={handleItemClick} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Collection</h2>
      
      {renderContent()}

      <ItemModal item={selectedItem} onClose={handleCloseModal} />
    </div>
  );
};

export default ViewItems;