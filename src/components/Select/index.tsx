import React, { useMemo, useRef } from 'react';
import clsx from 'classnames';
import usePopup from '../../hooks/usePopup';
import Icon from 'components/Icon';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  value?: any;
  onChange?: (val: any) => void;
  className?: string;
  showValue?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options = [],
  placeholder = 'Select Option',
  value,
  onChange,
  className,
  showValue = true,
}) => {
  const ref = useRef(null);
  const { isOpen, toggleMenu, closeMenu } = usePopup(ref);

  const selectedOption = useMemo(() => {
    return options.find((item) => item.value === value);
  }, [options, value]);

  const handleClick = (option: Option) => {
    onChange && onChange(option.value);
    closeMenu();
  }

  return (
    <div className={clsx('min-w-40', className)}>
      { label && (<p className="mb-1 dark:text-gray-75">{label}</p>) }

      <div className="relative w-full" ref={ref}>
        <div
          className={clsx('cursor-pointer  w-full rounded', {
            'bg-white dark:bg-indigo-1250 border-2 border-solid dark:border-indigo-1100 w-full rounded outline-0 p-2': showValue,
            'pr-6': !showValue
          })}
          onClick={toggleMenu}
        >
          <span className="mr-6">
          {
            selectedOption && showValue ? selectedOption.label : placeholder
          }
          </span>


          <Icon name="arrow-down" className={clsx('absolute transform top-1/2 -translate-y-2/4 right-4', isOpen ? 'transform rotate-180' : '')} />
        </div>
        <div className={clsx('absolute top-14 bg-white dark:bg-indigo-1100 left-0 min-w-full z-10 shadow-lg text-left rounded-lg transition-all duration-150 ease-in', isOpen ? 'max-h-80 overflow-auto' : 'opacity-0 max-h-0 overflow-hidden py-0')}>
          {
            options.map((option, index) => (
              <div
                data-testid="select-option"
                key={index}
                className="py-3 px-4 hover:text-indigo-350 border-b-2 last:border-0 border-gray-200 dark:border-indigo-1000 cursor-pointer whitespace-nowrap font-bold text-sm dark:text-white dark:hover:text-gray-500"
                onClick={() => handleClick(option)}
              >
                {option.label}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Select;
