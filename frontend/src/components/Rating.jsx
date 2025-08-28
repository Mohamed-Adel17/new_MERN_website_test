
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const Rating = ({ value, text, color, size = 'md', showValue = false }) => {
  // Add safety checks for props
  const safeValue = value || 0;
  const safeText = text || '';
  const safeSize = size || 'md';
  
  // Debug logging
  console.log('Rating component props:', { value, text, color, size, showValue });
  console.log('Rating component safe values:', { safeValue, safeText, safeSize });
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const renderStar = (starValue, index) => {
    const filled = safeValue >= starValue;
    const halfFilled = safeValue >= starValue - 0.5 && safeValue < starValue;
    
    if (filled) {
      return (
        <svg key={index} className={`${sizeClasses[size]} text-yellow-400`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else if (halfFilled) {
      return (
        <div key={index} className="relative">
          <svg className={`${sizeClasses[size]} text-gray-300`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <svg className={`${sizeClasses[size]} text-yellow-400`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      );
    } else {
      return (
        <svg key={index} className={`${sizeClasses[size]} text-gray-300`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRatingText = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Fair';
    return 'Poor';
  };

  return (
    <ErrorBoundary>
      <div className="flex items-center space-x-1">
        {/* Stars */}
        <div className="flex items-center space-x-0.5">
          {[1, 2, 3, 4, 5].map((star) => renderStar(star, star))}
        </div>
        
        {/* Rating Value and Text */}
        <div className="flex items-center space-x-2 ml-2">
          {showValue && (
            <span className={`font-semibold ${getRatingColor(safeValue)} ${textSizeClasses[safeSize]}`}>
              {safeValue.toFixed(1)}
            </span>
          )}
          
          {safeText && (
            <span className={`text-gray-600 ${textSizeClasses[safeSize]}`}>
              {safeText}
            </span>
          )}
          
          {/* Rating Quality Badge */}
          {showValue && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(safeValue)} bg-opacity-10 ${getRatingColor(safeValue).replace('text-', 'bg-')}`}>
              {getRatingText(safeValue)}
            </span>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

Rating.defaultProps = {
  color: '#fbbf24',
  size: 'md',
  showValue: false
};

export default Rating;
