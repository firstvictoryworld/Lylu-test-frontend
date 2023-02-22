import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import InvoiceDrawer from 'components/InvoiceDrawer';
import Select from 'components/Select';
import { InvoicesApi } from '../../api';
import { useAppState } from '../../providers/AppProvider';
import { INVOICE_STATUS } from '../../resources/enums';
import { trimQuery } from '../../helpers/ObjectHelper';
import InvoiceItem from './InvoiceItem';
import EmptyImg from '../../assets/illustration-empty.svg';
import PlusIcon from '../../assets/icon-plus.svg';

const statusOptions = [
  { label: 'All', value: '' },
  { label: 'Pending', value: INVOICE_STATUS.PENDING },
  { label: 'Draft', value: INVOICE_STATUS.DRAFT },
  { label: 'Paid', value: INVOICE_STATUS.PAID },
];

const Invoices = () => {
  const { invoices, setInvoices } = useAppState();
  const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    InvoicesApi.search(trimQuery({ status }))
      .then(({ data }) => {
        setInvoices(data.invoices);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [status]);

  return (
    <div>
      <div className="flex items-center justify-between w-full mb-10">
        <div>
          <h1 className="text-5xl mb-2">Invoices</h1>
          <p>There are {invoices.length} total invoices</p>
        </div>

        <div className="flex items-center">
          <Select
            className="mr-8"
            placeholder="Filter By Status"
            options={statusOptions}
            value={status}
            onChange={(value) => setStatus(value)}
            showValue={false}
          />

          <Button
            icon={
              <span className="flex items-center justify-center bg-white rounded-full w-8 h-8 mr-4 text-indigo-450 dark:!text-indigo-450">
                <img src={PlusIcon} alt="" />
              </span>
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenInvoiceDrawer(true);
            }}
          >
            New Invoice
          </Button>
        </div>
      </div>

      {
        invoices.length ? (
          <div className="grid grid-cols-auto-6 gap-y-4">
            {
              invoices.map((item) => (
                <InvoiceItem key={item.id} invoice={item} />
              ))
            }
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col pt-40">
            <img className="mb-10" src={EmptyImg} alt="" />
            <p className="text-3xl mb-6">There is nothing the</p>
            <p>Create an invoice by clicking here</p>
            <p>New invoice button and get started</p>
          </div>
        )
      }

      <InvoiceDrawer open={openInvoiceDrawer} onClose={() => setOpenInvoiceDrawer(false)} />
    </div>
  );
};

export default Invoices;