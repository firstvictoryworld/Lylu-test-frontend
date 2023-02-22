import React, {FC, MouseEventHandler, ReactElement, ReactNode} from 'react';
import Icon from "components/Icon";
import clsx from 'classnames';

interface ButtonProps {
  className?: string;
  icon?: ReactElement;
  children: ReactNode;
  color?: 'primary' | 'danger' | 'gray' | 'white',
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit',
  loading?: boolean;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  className = '',
  icon,
  children,
  color = 'primary',
  disabled,
  loading,
  onClick,
  ...rest
}) => {
  return (
    <button
      className={clsx(`relative outline-none flex items-center justify-center rounded-3xl py-3 hover:cursor-pointer ${className}`, {
        'px-6': !icon,
        'pl-3 pr-4': icon,
        'bg-gray-300 !cursor-not-allowed': loading || disabled,
        'text-gray-400': disabled,
        'cursor-pointer': !(loading || disabled),
        'text-transparent': loading,
        'bg-gray-50 hover:bg-gray-75 !text-gray-550': !(loading || disabled) && color === 'white',
        'bg-indigo-450 hover:bg-indigo-350 text-white': !(loading || disabled) && color === 'primary',
        'bg-red-450 hover:bg-red-350 text-white': !(loading || disabled) && color === 'danger',
        'bg-gray-25 hover:bg-gray-75 text-gray-550 dark:bg-indigo-1100 dark:hover:bg-white dark:text-white dark:hover:text-gray-250': !(loading || disabled) && color === 'gray'
      })}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {
        loading && (
          <div className="absolute -translate-x-1/2 left-1/2">
            <Icon
              className="animate-spin"
              name="spinner"
            />
          </div>
        )
      }

      { icon && icon}
      {children}
    </button>
  );
};

export default Button;