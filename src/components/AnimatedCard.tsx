import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'rotate';
  clickEffect?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  delay = 0,
  hoverEffect = 'lift',
  clickEffect = true
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const hoverEffects = {
    lift: 'hover:-translate-y-2 hover:shadow-2xl',
    glow: 'hover:shadow-2xl hover:shadow-orange-500/20',
    scale: 'hover:scale-105',
    rotate: 'hover:rotate-1 hover:scale-105'
  };

  const handleMouseDown = () => {
    if (clickEffect) setIsClicked(true);
  };

  const handleMouseUp = () => {
    if (clickEffect) setIsClicked(false);
  };

  const handleMouseLeave = () => {
    if (clickEffect) setIsClicked(false);
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`
        transition-all duration-500 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${hoverEffects[hoverEffect]}
        ${isClicked ? 'scale-95' : ''}
        ${className}
      `}
      style={{ 
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`
      }}
    >
      {children}
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 via-transparent to-orange-500/20 animate-pulse" />
      </div>
    </div>
  );
};

export default AnimatedCard;