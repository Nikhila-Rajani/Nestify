import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, type = 'button', className = '', onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D23166] transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
