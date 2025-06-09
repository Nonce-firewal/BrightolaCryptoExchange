import React, { useEffect, useState } from 'react';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'fadeIn'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animations = {
    fadeIn: isVisible ? 'opacity-100' : 'opacity-0',
    slideUp: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    slideLeft: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
    slideRight: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
    scale: isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
    rotate: isVisible ? 'opacity-100 rotate-0' : 'opacity-0 rotate-3'
  };

  return (
    <div 
      className={`transition-all duration-700 ease-out transform ${animations[animation]} ${className}`}
    >
      {children}
      
      {/* Page transition overlay */}
      <div className={`fixed inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 pointer-events-none transition-opacity duration-1000 ${
        isVisible ? 'opacity-0' : 'opacity-100'
      }`} />
    </div>
  );
};

export default AnimatedPage;