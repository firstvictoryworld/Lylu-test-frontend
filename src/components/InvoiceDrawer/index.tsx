import React, { FC, useEffect, useState } from 'react';
import { IInvoice } from '../../resources/interfaces';
import Drawer from 'components/Drawer';
import Input from 'components/Input';
import Button from 'components/Button';
import DatePicker from 'components/DatePicker';
import Select from 'components/Select';
import ItemsList from 'components/InvoiceDrawer/ItemsList';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import { InvoicesApi } from '../../api';
import { INVOICE_STATUS } from '../../resources/enums';
import { useAppState } from '../../providers/AppProvider';
import { trimQuery } from '../../helpers/ObjectHelper';

const validationSchema = Yup.object().shape({
  description: Yup.string().trim().required('Required Field'),
  clientName: Yup.string().trim().required('Required Field'),
  clientEmail: Yup.string().trim().email('Invalid Email').required('Required Field'),
  senderAddressStreet: Yup.string().trim().required('Required Field'),
  senderAddressCity: Yup.string().trim().required('Required Field'),
  senderAddressPostCode: Yup.string().trim().required('Required Field'),
  senderAddressCountry: Yup.string().trim().required('Required Field'),
  clientAddressStreet: Yup.string().trim().required('Required Field'),
  clientAddressCountry: Yup.string().trim().required('Required Field'),
  clientAddressCity: Yup.string().trim().required('Required Field'),
  clientAddressPostCode: Yup.string().trim().required('Required Field'),
  paymentTerms: Yup.number().required('Required Field'),
  paymentDue: Yup.date().required('Required Field'),
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().trim().required('Required Field'),
      quantity: Yup.number().required('Required Field'),
      price: Yup.number().required('Required Field'),
      total: Yup.number().required('Required Field'),
    })
  ).required('Required Field').min(1, 'Required Field'),
})

const paymentTermsOptions = [
  { label: 'Net 1 day', value: 1 },
  { label: 'Net 7 days', value: 7 },
  { label: 'Net 30 days', value: 30 },
];

interface InvoiceDrawerProps {
  invoice?: IInvoice;
  onEditInvoice?: (value: IInvoice) => void;
  open: boolean;
  onClose: () => void;
}

const InvoiceDrawer: FC<InvoiceDrawerProps> = ({
  invoice,
  open,
  onClose,
  onEditInvoice,
}) => {
  const { addInvoice } = useAppState();
  const [saving, setSaving] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [savingChange, setSavingChange] = useState(false);

  const onSubmit = (values: any, status: INVOICE_STATUS) => {
    const {
      senderAddressStreet, senderAddressCity, senderAddressPostCode, senderAddressCountry,
      clientAddressStreet, clientAddressCity, clientAddressPostCode, clientAddressCountry,
      paymentDue,
      ...rest
    } = values;

    let createAPI;

    if (status === INVOICE_STATUS.PENDING) {
      setSaving(true);
      createAPI = InvoicesApi.create;
    } else {
      createAPI = InvoicesApi.saveDraft;
      setSavingDraft(true);
    }

    createAPI(trimQuery({
      ...rest,
      paymentDue: paymentDue.toLocaleString(),
      senderAddress: {
        street: senderAddressStreet,
        city: senderAddressCity,
        postCode: senderAddressPostCode,
        country: senderAddressCountry,
      },
      clientAddress: {
        street: clientAddressStreet,
        city: clientAddressCity,
        postCode: clientAddressPostCode,
        country: clientAddressCountry,
      }
    }))
      .then(({ data }) => {
        addInvoice(data.invoice);
        onClose();
      })
      .catch((err) => {
        console.log('err', err)
      })
      .finally(() => {
        if (status === INVOICE_STATUS.PENDING) {
          setSaving(false);
        } else {
          setSavingDraft(false);
        }
      })
  }

  const form = useFormik({
    initialValues: {
      paymentDue: new Date(),
      description: invoice ? invoice.description : '',
      clientName: invoice ? invoice.clientName : '',
      clientEmail: invoice ? invoice.clientEmail : '',
      senderAddressStreet: invoice ? invoice.senderAddress.street : '',
      senderAddressCity: invoice ? invoice.senderAddress.city : '',
      senderAddressPostCode: invoice ? invoice.senderAddress.postCode : '',
      senderAddressCountry: invoice ? invoice.senderAddress.country : '',
      clientAddressStreet: invoice ? invoice.clientAddress.street : '',
      clientAddressCity: invoice ? invoice.clientAddress.city : '',
      clientAddressPostCode: invoice ? invoice.clientAddress.postCode : '',
      clientAddressCountry: invoice ? invoice.clientAddress.country : '',
      paymentTerms: invoice ? invoice.paymentTerms : 1,
      items: invoice && invoice.items ? invoice.items.map((item) => ({...item, id: `${Math.random()}`})) : [],
    },
    validationSchema: invoice ? validationSchema : Yup.object().shape({}),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {}
  });

  const onSave = (status: INVOICE_STATUS) => {
    if (form.isValid) {
      onSubmit(form.values, status);
    }
  };

  const onCancel = () => {
    form.resetForm();
    onClose();
  }

  const onEditSave = () => {
    if (form.isValid && invoice) {
      const {
        senderAddressStreet, senderAddressCity, senderAddressPostCode, senderAddressCountry,
        clientAddressStreet, clientAddressCity, clientAddressPostCode, clientAddressCountry,
        paymentDue,
        ...rest
      } = form.values;

      setSavingChange(true);

      InvoicesApi.update(invoice.id, {
        ...rest,
        paymentDue: paymentDue.toLocaleString(),
        senderAddress: {
          street: senderAddressStreet,
          city: senderAddressCity,
          postCode: senderAddressPostCode,
          country: senderAddressCountry,
        },
        clientAddress: {
          street: clientAddressStreet,
          city: clientAddressCity,
          postCode: clientAddressPostCode,
          country: clientAddressCountry,
        }
      }).then(({ data }) => {
        setSavingChange(false);
        if (onEditInvoice) {
          onEditInvoice(data.invoice);
        }
        onClose();
      }).catch((err) => {
        setSavingChange(false);
      })
    }
  }

  useEffect(() => {
    if (!open) {
      form.resetForm();
    }
  }, [open]);

  return (
    <Drawer open={open} onClose={onClose}>
      <form>
        <div className="py-8 pl-8 pr-4 flex flex-col w-full h-screen">
          <h1 className="text-3xl font-bold mb-8">
            { invoice ? `Edit #${invoice.id}` : 'New Invoice' }
          </h1>
          <div className="overflow-y-auto h-0 flex-grow pr-4 pb-4">
            <div className="mb-8">
              <p className="text-indigo-450 font-bold mb-6">Bill From</p>

              <Input
                className="mb-4"
                label="Street Address"
                {...form.getFieldProps('senderAddressStreet')}
                error={ form.errors.senderAddressStreet && form.touched.senderAddressStreet ? form.errors.senderAddressStreet : ''}
              />

              <div className="grid grid-cols-3 gap-x-4">
                <Input
                  label="City"
                  {...form.getFieldProps('senderAddressCity')}
                  error={ form.errors.senderAddressCity && form.touched.senderAddressCity ? form.errors.senderAddressCity : ''}
                />
                <Input
                  label="Post Code"
                  {...form.getFieldProps('senderAddressPostCode')}
                  error={ form.errors.senderAddressPostCode && form.touched.senderAddressPostCode ? form.errors.senderAddressPostCode : ''}
                />
                <Input
                  label="Country"
                  {...form.getFieldProps('senderAddressCountry')}
                  error={ form.errors.senderAddressCountry && form.touched.senderAddressCountry ? form.errors.senderAddressCountry : ''}
                />
              </div>
            </div>

            <div className="mb-8">
              <p className="text-indigo-450 font-bold mb-6">Bill To</p>

              <Input
                className="mb-4"
                label="Client's Name"
                {...form.getFieldProps('clientName')}
                error={ form.errors.clientName && form.touched.clientName ? form.errors.clientName : ''}
              />

              <Input
                className="mb-4"
                label="Client's Email"
                {...form.getFieldProps('clientEmail')}
                error={ form.errors.clientEmail && form.touched.clientEmail ? form.errors.clientEmail : ''}
              />

              <Input
                className="mb-4"
                label="Street Address"
                {...form.getFieldProps('clientAddressStreet')}
                error={ form.errors.clientAddressStreet && form.touched.clientAddressStreet ? form.errors.clientAddressStreet : ''}
              />

              <div className="grid grid-cols-3 gap-x-4 mb-6">
                <Input
                  label="City"
                  {...form.getFieldProps('clientAddressCity')}
                  error={ form.errors.clientAddressCity && form.touched.clientAddressCity ? form.errors.clientAddressCity : ''}
                />
                <Input
                  label="Post Code"
                  {...form.getFieldProps('clientAddressPostCode')}
                  error={ form.errors.clientAddressPostCode && form.touched.clientAddressPostCode ? form.errors.clientAddressPostCode : ''}
                />
                <Input
                  label="Country"
                  {...form.getFieldProps('clientAddressCountry')}
                  error={ form.errors.clientAddressCountry && form.touched.clientAddressCountry ? form.errors.clientAddressCountry : ''}
                />
              </div>

              <div className="grid grid-cols-2 gap-x-4 mb-4">
                <DatePicker
                  className="mb-4"
                  label="Issue Date"
                  value={form.values.paymentDue}
                  onChange={(value) => form.setFieldValue('paymentDue', value)}
                />
                <Select
                  className="mb-4"
                  label="Payment Terms"
                  options={paymentTermsOptions}
                  value={form.values.paymentTerms}
                  onChange={(value) => form.setFieldValue('paymentTerms', value)}
                />
              </div>

              <Input
                className="mb-4"
                label="Project Description"
                {...form.getFieldProps('description')}
                error={ form.errors.description && form.touched.description ? form.errors.description : ''}
              />
            </div>

            <ItemsList form={form} />
          </div>

          {
            invoice ? (
              <div className="flex items-center justify-end w-full mt-8">
                <Button type="button" color="gray" onClick={onCancel}>
                  Cancel
                </Button>

                <Button
                  className="ml-4"
                  type="button"
                  onClick={onEditSave}
                  loading={savingChange}
                  disabled={!form.isValid}
                >
                  Save changes
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mt-8">
                <Button type="button" color="white" onClick={onCancel}>
                  Discard
                </Button>

                <div className="flex items-center">
                  <Button
                    type="button"
                    color="gray"
                    onClick={() => onSave(INVOICE_STATUS.DRAFT)}
                    loading={savingDraft}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    className="ml-4"
                    type="button"
                    loading={saving}
                    onClick={() => onSave(INVOICE_STATUS.PENDING)}
                  >
                    Save & Send
                  </Button>
                </div>
              </div>
            )
          }

        </div>
      </form>
    </Drawer>
  );
};

export default InvoiceDrawer