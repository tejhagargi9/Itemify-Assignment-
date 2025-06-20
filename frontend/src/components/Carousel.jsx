// src/components/Carousel.js
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
        No Image
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    // This parent container will fill the space provided by ItemModal
    <div className="relative w-full h-full">
      <div className="w-full h-full rounded-l-xl overflow-hidden">
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          className="w-full h-full object-cover" 
        />
      </div>
      {images.length > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition">
            <ChevronLeft size={24} />
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition">
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;