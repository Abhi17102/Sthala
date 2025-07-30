import React, { useState, useEffect } from 'react';

const TypewriterText: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'Rent. Work. Move.';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex(0);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="text-center mt-8">
      <h2 className="text-3xl md:text-4xl font-bold text-white inline-block">
        {displayText}
        <span className="animate-blink border-r-2 border-primary ml-1"></span>
      </h2>
    </div>
  );
};

export default TypewriterText;