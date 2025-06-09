import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'orange' | 'blue' | 'green' | 'white';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'orange',
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    orange: 'border-orange-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    white: 'border-white'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        {/* Main spinner */}
        <div className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`} />
        
        {/* Inner spinner */}
        <div className={`absolute inset-1 border border-${color}-300 border-t-transparent rounded-full animate-spin-reverse`} />
        
        {/* Pulse effect */}
        <div className={`absolute inset-0 ${sizeClasses[size]} bg-${color}-500 rounded-full opacity-20 animate-ping`} />
      </div>
      
      {text && (
        <div className="text-center">
          <p className="text-gray-300 text-sm animate-pulse">{text}</p>
          <div className="flex space-x-1 justify-center mt-2">
            <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;