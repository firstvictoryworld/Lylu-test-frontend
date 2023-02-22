import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { IInvoice } from '../../resources/interfaces';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { InvoicesApi } from '../../api';
import { ROUTES } from '../../constants';

interface InvoiceDeleteModalProps {
  open: boolean;
  onClose: () => void;
  invoice: IInvoice;
}

const InvoiceDeleteModal: FC<InvoiceDeleteModalProps> = ({
  open,
  onClose,
  invoice,
}) => {
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);

  const removeInvoice = () => {
    setLoading(true);

    InvoicesApi.delete(invoice.id)
      .then(() => {
        setLoading(false);
        onClose();
        navigateTo(ROUTES.INVOICES.INDEX);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative rounded-xl p-8 mx-6 shadow bg-white dark:bg-indigo-1250 min-w-130 max-w-[550px]">
        <h1 className="text-3xl mb-6">Confirm Deletion</h1>
        <p className="mb-6">Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.</p>

        <div className="flex items-center justify-end">
          <Button color="gray" onClick={onClose}>Cancel</Button>
          <Button color="danger" className="ml-4" loading={loading} onClick={removeInvoice}>Delete</Button>
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceDeleteModal;