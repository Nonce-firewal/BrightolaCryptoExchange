import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AnimatedInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  required?: boolean;
  className?: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setHasValue(value.length > 0);
  };

  return (
    <div className={`relative ${className}`}>
      <label 
        htmlFor={id} 
        className={`block text-sm font-medium mb-2 transition-all duration-300 ${
          isFocused ? 'text-orange-400 transform scale-105' : 'text-gray-300'
        }`}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="relative group">
        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 ${
          isFocused ? 'text-orange-400 transform scale-110' : 'text-gray-500'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={(e) => {
            onChange(e);
            setHasValue(e.target.value.length > 0);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 transform ${
            isFocused ? 'scale-[1.02] shadow-lg border-orange-500' : 'hover:border-gray-600 hover:shadow-md'
          } ${hasValue ? 'border-green-500/50' : ''}`}
          placeholder={placeholder}
        />
        
        {/* Animated border */}
        <div className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${
          isFocused ? 'ring-2 ring-orange-500/20 ring-offset-2 ring-offset-gray-900' : ''
        }`} />
        
        {/* Success indicator */}
        {hasValue && !isFocused && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
        
        {/* Floating particles effect on focus */}
        {isFocused && (
          <>
            <div className="absolute -top-1 left-4 w-1 h-1 bg-orange-400 rounded-full animate-float-1" />
            <div className="absolute -top-1 right-8 w-1 h-1 bg-orange-400 rounded-full animate-float-2" />
            <div className="absolute -bottom-1 left-8 w-1 h-1 bg-orange-400 rounded-full animate-float-3" />
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-8px) rotate(-180deg); opacity: 1; }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(8px) rotate(90deg); opacity: 1; }
        }
        .animate-float-1 { animation: float-1 2s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 2.5s ease-in-out infinite 0.5s; }
        .animate-float-3 { animation: float-3 3s ease-in-out infinite 1s; }
      `}</style>
    </div>
  );
};

export default AnimatedInput;