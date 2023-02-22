import React, { ChangeEvent, FC } from 'react';

interface InputProps {
  name?: string;
  className?: string;
  label?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: 'text' | 'number'
}

const Input: FC<InputProps> = ({
  label,
  className = '',
  error,
  ...props
}) => {
  return (
    <div className={`${className}`}>
      { label && (<p className="mb-1 dark:text-gray-75">{label}</p>) }

      <div className="relative flex items-center w-full">
        <input
          className="dark:bg-indigo-1250 border-2 border-solid dark:border-indigo-1100 w-full rounded outline-0 p-2"
          {...props}
        />
      </div>
      { error && (<p className="dark:text-red-800 text-red-800">{error}</p>) }
    </div>
  )
};

export default Input;
