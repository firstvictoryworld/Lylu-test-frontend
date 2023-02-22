import React, { forwardRef, LegacyRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import clsx from 'classnames';
import Icon from 'components/Icon';
import 'react-datepicker/dist/react-datepicker.min.css';

const DateInput = forwardRef((props: any, ref: LegacyRef<any>) => (
  <div className="relative h-full">
    <input
      ref={ref}
      {...props}
      className={clsx(
        'dark:bg-indigo-1250 border-2 border-solid dark:border-indigo-1100 w-full rounded outline-0 p-2',
      )}
    />
    <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
      <Icon name="calendar" />
    </div>
  </div>
));

interface IDatepickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date, event: React.SyntheticEvent) => void;
  className?: string;
}

const Datepicker: React.FC<IDatepickerProps> = ({
  label,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      { label && (<p className="mb-1 dark:text-gray-75">{label}</p>) }

      <ReactDatePicker
        selected={value}
        onChange={onChange}
        customInput={<DateInput />}
      />
    </div>
  );
}

export default Datepicker;
