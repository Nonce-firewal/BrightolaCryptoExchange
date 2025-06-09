import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

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

  return (
    <div className={`relative ${className}`}>
      <label 
        htmlFor={id} 
        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
          isFocused ? 'text-orange-400' : 'text-gray-300'
        }`}
      >
        {label}
      </label>
      <div className="relative group">
        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${
          isFocused ? 'text-orange-400' : 'text-gray-500'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 transform ${
            isFocused ? 'scale-[1.02] shadow-lg' : 'hover:border-gray-600'
          }`}
          placeholder={placeholder}
        />
        <div className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${
          isFocused ? 'ring-2 ring-orange-500/20 ring-offset-2 ring-offset-gray-900' : ''
        }`} />
      </div>
    </div>
  );
};

export default AnimatedInput;