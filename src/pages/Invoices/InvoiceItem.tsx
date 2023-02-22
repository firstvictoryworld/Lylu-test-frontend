import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import InvoiceStatus from 'components/InvoiceStatus';
import { IInvoice } from '../../resources/interfaces';
import { ROUTES } from '../../constants';
import { formatDate } from '../../helpers/DateHelper';
import ArrowRightImg from '../../assets/icon-arrow-right.svg';

interface InvoiceItemProps {
  invoice: IInvoice;
}

const InvoiceItem: FC<InvoiceItemProps> = ({
  invoice,
}) => {
  const navigateTo = useNavigate();

  return (
    <>
      <div className="flex items-center bg-white dark:bg-indigo-1250 px-6 py-4 rounded-l-md">
        <span className="text-gray-150 mr-2">#</span>
        <span>{invoice.id}</span>
      </div>

      <div className="flex items-center bg-white dark:bg-indigo-1250 px-6 py-4">
        <span>Due {formatDate(invoice.paymentDue, 'DD MMM YYYY')}</span>
      </div>

      <div className="flex items-center bg-white dark:bg-indigo-1250 px-6 py-4">
        <span>{invoice.clientName}</span>
      </div>

      <div className="flex items-center bg-white dark:bg-indigo-1250 px-6 py-4">
        <span>&pound;{invoice.total}</span>
      </div>

      <div className="flex items-center bg-white dark:bg-indigo-1250 px-6 py-4">
        <InvoiceStatus status={invoice.status} />
      </div>

      <div className="flex items-center justify-end bg-white dark:bg-indigo-1250 px-6 py-4 rounded-r-md">
        <div className="hover:cursor-pointer" onClick={() => navigateTo(`${ROUTES.INVOICES.PREFIX}/${invoice.id}`)}>
          <img src={ArrowRightImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default InvoiceItem;