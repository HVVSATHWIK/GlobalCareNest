import React, { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`
      max-w-7xl 
      mx-auto 
      px-4 
      sm:px-6 
      lg:px-8 
      w-full
      ${className}
    `}>
      {children}
    </div>
  );
};