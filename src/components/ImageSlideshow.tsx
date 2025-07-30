import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import image1 from '../assets/WhatsApp Image 2025-07-30 at 15.46.47_215e576a.jpg';
import image2 from '../assets/WhatsApp Image 2025-07-30 at 15.33.37_c3999a16.jpg';
import image3 from '../assets/WhatsApp Image 2025-07-30 at 15.19.52_5d26de6f.jpg';
import image4 from '../assets/WhatsApp Image 2025-07-30 at 15.23.26_4f32c14a.jpg';
import image5 from '../assets/WhatsApp Image 2025-07-30 at 15.21.39_27b1a3ed.jpg';
import image6 from '../assets/WhatsApp Image 2025-07-30 at 15.21.26_ee3f9a91.jpg';

const images = [image1, image2, image3, image4, image5, image6];

const ImageSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Venue ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center z-10">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <div className="w-0 h-0 border-l-8 border-r-0 border-t-6 border-b-6 border-l-white border-t-transparent border-b-transparent ml-1"></div>
          </div>
          <p className="text-lg font-medium">Event Venues Showcase</p>
          <p className="text-sm opacity-80">Discover amazing spaces</p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlideshow; 