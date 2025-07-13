import { useState } from 'react';

export default function AnimatedCard({ children, className = '', hoverScale = true }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        transition-all duration-300 ease-out
        ${hoverScale ? 'hover:scale-105' : ''}
        hover:shadow-xl
        ${isHovered ? 'transform-gpu' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}