import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  disabled = false,
  loading = false,
  className = ''
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500 border border-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-lg hover:shadow-xl'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isPressed ? 'scale-95' : 'hover:scale-105'}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed transform-none' : ''}
        ${className}
      `}
    >
      {/* Ripple effect */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <div className={`flex items-center ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        {Icon && iconPosition === 'left' && (
          <Icon className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} mr-2 transition-transform duration-300 group-hover:scale-110`} />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} ml-2 transition-transform duration-300 group-hover:translate-x-1`} />
        )}
      </div>
    </button>
  );
};

export default AnimatedButton;