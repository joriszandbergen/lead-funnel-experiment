import React from 'react';

interface CardProps {
    selected?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({
    selected = false,
    onClick,
    children,
    className = ''
}) => {
    return (
        <div
            onClick={onClick}
            className={`
        p-6 rounded-xl border-2 cursor-pointer text-gray-900 transition-all duration-200
        ${selected
                    ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-600/10'
                    : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-md'
                }
        ${className}
      `}
        >
            {children}
        </div>
    );
};
