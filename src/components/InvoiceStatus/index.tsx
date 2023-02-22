import React, { FC } from 'react';
import clsx from 'classnames';
import { INVOICE_STATUS } from '../../resources/enums';

interface InvoiceStatusProps {
  status: INVOICE_STATUS
}

const InvoiceStatus: FC<InvoiceStatusProps> = ({
  status,
}) => {
  return (
    <div
      className={clsx(`flex items-center rounded px-4 py-2`, {
        'bg-green-750 bg-opacity-20 text-green-750': status === INVOICE_STATUS.PAID,
        'bg-orange-750 bg-opacity-20 text-orange-750': status === INVOICE_STATUS.PENDING,
        'bg-gray-75 bg-opacity-20 text-gray-75': status === INVOICE_STATUS.DRAFT,
      })}
    >
      <div
        className={clsx(`flex w-[10px] h-[10px] mr-3 rounded-full`, {
          'bg-green-750': status === INVOICE_STATUS.PAID,
          'bg-orange-750': status === INVOICE_STATUS.PENDING,
          'bg-gray-75': status === INVOICE_STATUS.DRAFT,
        })}
      >
      </div>

      <span
        className={clsx('capitalize', {
          '!text-green-750': status === INVOICE_STATUS.PAID,
          '!text-orange-750': status === INVOICE_STATUS.PENDING,
          '!text-gray-75': status === INVOICE_STATUS.DRAFT,
        })}
      >
        {status}
      </span>
    </div>
  );
};

export default InvoiceStatus;