// src/pages/AddItem.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("Shirt");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions

    if (!itemName || !coverImage) {
      setError("Please provide an item name and a cover image.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowSuccess(false);

    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("type", itemType);
    formData.append("description", description);
    formData.append("coverImage", coverImage);
    additionalImages.forEach((image) => {
      formData.append("additionalImages", image);
    });

    try {
      const response = await fetch(`${BACKEND_URL}/addItems`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to add item. Please try again.");
      }
      
      await response.json();

      // Show the success message.
      setShowSuccess(true);
      
      // Set a timer to navigate after 3 seconds.
      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.message);
      setIsLoading(false); // Stop loading on error
    } 
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add a New Item</h2>

        {showSuccess && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md flex items-center">
            <CheckCircle className="mr-3" />
            <p className="font-bold">Item added! Redirecting...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md flex items-center">
            <AlertCircle className="mr-3" />
            <p className="font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... all your input fields ... */}
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
            <select id="itemType" value={itemType} onChange={(e) => setItemType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
              <option>Shirt</option>
              <option>Pant</option>
              <option>Shoes</option>
              <option>Sports Gear</option>
              <option>Accessory</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Item Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">Cover Image (Required)</label>
            <input type="file" id="coverImage" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          </div>
          <div>
            <label htmlFor="additionalImages" className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
            <input type="file" id="additionalImages" accept="image/*" multiple onChange={(e) => setAdditionalImages(Array.from(e.target.files))} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Adding...
              </>
            ) : ( "Add Item" )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;