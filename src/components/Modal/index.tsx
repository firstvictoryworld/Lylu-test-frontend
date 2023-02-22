import React, {MouseEventHandler, ReactNode, useEffect, useRef} from 'react';
import clsx from 'classnames';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const modal = useRef(null);

  const handleClickModal: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (open) {
      window.addEventListener('click', onClose);

      return () => {
        window.removeEventListener('click', onClose);
      };
    }
  }, [open, onClose]);

  return (
    <div
      className={clsx(
        'fixed z-50 left-0 top-0 w-screen h-screen overflow-auto bg-black bg-opacity-30 flex justify-center items-center',
        open ? 'block' : 'hidden'
      )}
      onClick={onClose}
    >
      <div ref={modal} onClick={handleClickModal}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
