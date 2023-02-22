import React, { FC } from 'react';
import {
  ArrowDownIcon,
  CalendarIcon,
  DeleteIcon,
  MoonIcon,
  SpinnerIcon,
  SunIcon,
  PlusIcon,
} from './source';

const IconsMap: any = {
  'arrow-down': ArrowDownIcon,
  calendar: CalendarIcon,
  delete: DeleteIcon,
  plus: PlusIcon,
  spinner: SpinnerIcon,
  sun: SunIcon,
  moon: MoonIcon,
}

interface IconProps {
  name: string;
  className?: string;
  color?: string;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xLarge' | 'huge';
  onClick?: (e: MouseEvent) => void;
}

const Icon: FC<IconProps> = ({
  name,
  className = '',
  color,
  size = 'medium',
  ...props
}) => {
  const sizes = {
    tiny: '0.5rem',
    small: '1rem',
    medium: '1.25rem',
    large: '2rem',
    xLarge: '3rem',
    huge: '5rem'
  };

  const Component = IconsMap[name];

  if (!Component) {
    return <div />
  }

  return (
    <Component
      width={sizes[size]}
      height={sizes[size]}
      className={className}
      style={{ color }}
      {...props}
    />
  )
};

export default Icon;