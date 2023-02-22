import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import ArrowLeftIcon from '../../assets/icon-arrow-left.svg';

interface BackButtonProps {
  className?: string;
}

const BackButton: FC<BackButtonProps> = ({
  className = ''
}) => {
  const navigateTo = useNavigate();

  return (
    <div
      className={`flex items-center hover:cursor-pointer hover:opacity-80 ${className}`}
      onClick={() => navigateTo(-1)}
    >
      <img className="mr-6" src={ArrowLeftIcon} alt="" />

      <span>Go back</span>
    </div>
  );
};

export default BackButton;