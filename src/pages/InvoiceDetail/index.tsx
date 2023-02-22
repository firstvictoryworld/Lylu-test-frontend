import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BackButton from 'components/BackButton';
import InvoiceStatus from 'components/InvoiceStatus';
import Button from 'components/Button';
import InvoiceDrawer from 'components/InvoiceDrawer';
import InvoiceDeleteModal from './InvoiceDeleteModal';
import { InvoicesApi } from '../../api';
import { IInvoice } from '../../resources/interfaces';
import { INVOICE_STATUS } from '../../resources/enums';
import { formatDate } from '../../helpers/DateHelper';

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [invoice, setInvoice] = useState<IInvoice | undefined>(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [markPaidLoading, setMarkPaidLoading] = useState(false);
  const [showInvoiceDrawer, setShowInvoiceDrawer] = useState(false);

  const closeModal = () => {
    setShowDeleteConfirm(false);
  };

  const markAsPaid = () => {
    if (invoice) {
      setMarkPaidLoading(true);

      InvoicesApi.markAsPaid(invoice.id)
        .then(() => {
          setMarkPaidLoading(false);
          setInvoice({
            ...invoice,
            status: INVOICE_STATUS.PAID,
          });
        })
        .catch(() => {
          setMarkPaidLoading(false);
        })
    }
  };

  const onEditInvoice = (data: IInvoice) => {
    setInvoice({
      ...invoice,
      ...data,
    });
  }

  useEffect(() => {
    if (id) {
      InvoicesApi.find(id)
        .then(({ data }) => {
            setInvoice(data.invoice);
        })
        .catch((err) => {
          console.log('err', err)
        });
    }
  }, [id]);

  return (
    <div>
      <BackButton className="mb-8" />

      {
        invoice && (
          <>
            <div className="flex items-center justify-between w-full bg-gray-100 dark:bg-indigo-1250 rounded-xl px-6 py-4 mb-8">
              <div className="flex items-center">
                <span className="mr-6">Status</span>

                <InvoiceStatus status={invoice.status} />
              </div>

              <div className="flex items-center">
                <Button
                  color="gray"
                  className="mr-3"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowInvoiceDrawer(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  color="danger"
                  className="mr-3"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowDeleteConfirm(true);
                  }}
                >
                  Delete
                </Button>

                <Button
                  color="primary"
                  onClick={markAsPaid}
                  loading={markPaidLoading}
                  disabled={invoice.status === INVOICE_STATUS.PAID || invoice.status === INVOICE_STATUS.DRAFT}
                >
                  Mark as paid
                </Button>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-indigo-1250 rounded-xl p-8 mb-8">
              <div className="flex items-center justify-between w-full mb-6">
                <div>
                  <h2 className="text-4xl mb-4">
                    <span className="dark:text-gray-75 text-gray-400">#</span>{invoice.id}
                  </h2>

                  <p className="">{invoice.description}</p>
                </div>

                <div className="flex flex-col items-end">
                  <span>{invoice.senderAddress.street}</span>
                  <span>{invoice.senderAddress.city}</span>
                  <span>{invoice.senderAddress.postCode}</span>
                  <span>{invoice.senderAddress.country}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 mb-12">
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="dark:text-gray-75 mb-2">Invoice Date</p>
                    <p className="font-bold text-2xl">{formatDate(invoice.createdAt, 'DD MMM YYYY')}</p>
                  </div>

                  <div>
                    <p className="dark:text-gray-75 mb-2">Payment Due</p>
                    <p className="font-bold text-2xl">{formatDate(invoice.paymentDue, 'DD MMM YYYY')}</p>
                  </div>
                </div>
                <div>
                  <p className="dark:text-gray-75 mb-2">Bill to</p>
                  <p className="font-bold text-2xl mb-4">{invoice.clientName}</p>
                  <p className="dark:text-gray-75">{invoice.clientAddress.street}</p>
                  <p className="dark:text-gray-75">{invoice.clientAddress.city}</p>
                  <p className="dark:text-gray-75">{invoice.clientAddress.postCode}</p>
                  <p className="dark:text-gray-75">{invoice.clientAddress.country}</p>
                </div>
                <div>
                  <p>Sent to</p>
                  <p>{invoice.clientEmail}</p>
                </div>
              </div>

              <div className="rounded-xl bg-gray-200 dark:bg-indigo-1100">
                <div className="p-10">
                  <table className="w-full">
                    <thead>
                    <tr>
                      <td className="py-4">Item Name</td>
                      <td className="py-4">QTY.</td>
                      <td className="py-4 text-right">Price</td>
                      <td className="py-4 text-right">Total</td>
                    </tr>
                    </thead>
                    <tbody className="font-bold">
                    {
                      invoice.items && invoice.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td className="text-right">&pound; {item.price}</td>
                          <td className="text-right">&pound; {item.total}</td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </div>

                <div className="p-10 rounded-b-xl bg-white dark:bg-black">
                  <div className="flex items-center justify-between w-full">
                    <span>Amount Due</span>
                    <span className="text-3xl font-bold">&pound; {invoice.total}</span>
                  </div>
                </div>
              </div>
            </div>

            <InvoiceDeleteModal
              open={showDeleteConfirm}
              onClose={closeModal}
              invoice={invoice}
            />

            <InvoiceDrawer
              invoice={invoice}
              open={showInvoiceDrawer}
              onClose={() => setShowInvoiceDrawer(false)}
              onEditInvoice={onEditInvoice}
            />
          </>
        )
      }

    </div>
  );
};

export default InvoiceDetail;