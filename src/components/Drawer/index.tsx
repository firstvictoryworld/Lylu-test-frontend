import React, { MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import clsx from 'classnames';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}


const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
  const drawer = useRef(null);

  useEffect(() => {
    if (open) {
      window.addEventListener('click', onClose);

      return () => {
        window.removeEventListener('click', onClose);
      };
    }
  }, [open, onClose]);

  const handleClickSidebar: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={clsx(
        'fixed z-50 left-0 top-0 w-screen h-screen overflow-auto bg-black bg-opacity-30',
        open ? 'block' : 'hidden'
      )}
      onClick={onClose}
    >
      <div
        ref={drawer}
        className={clsx(`bg-gray-100 dark:bg-indigo-1300 w-[600px] h-screen fixed left-[100px]`, {
        })}
        onClick={handleClickSidebar}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer
