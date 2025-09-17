import React, { useState, useEffect } from 'react';
import { ImArrowUp } from 'react-icons/im';

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 mainBg text-black h-10 w-10 flex items-center justify-center px-3 py-2 rounded-full shadow-lg z-40 hover:bg-white transition-all duration-300 transform ${
        showButton ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
      aria-label="Scroll to top"
      style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
    >
      <ImArrowUp  />
    </button>
  );
}

export default ScrollToTopButton;
