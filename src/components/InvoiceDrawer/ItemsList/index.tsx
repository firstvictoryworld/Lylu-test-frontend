import React, { FC } from 'react';
import Button from 'components/Button';
import { FormikContextType } from 'formik';
import InvoiceItem from 'components/InvoiceDrawer/ItemsList/InvoiceItem';
import Icon from "components/Icon";

interface ItemListProps {
  form: FormikContextType<any>;
}

const ItemsList: FC<ItemListProps> = ({
  form,
}) => {
  const { items } = form.values;

  const onChangeItem = (id: string, field: string, value: any) => {
    form.setFieldValue('items', items.map((item: any) => {
      if (item.id === id) {
        if (field === 'quantity' || field === 'price') {
          value = Number(value);
        }
        const data = { ...item, [field]: value };

        data.total = Number(data.price) * Number(data.quantity);

        return data;
      }

      return item;
    }));
  };

  const onRemoveItem = (id: string) => {
    form.setFieldValue('items', items.filter((item: any) => {
      return item.id !== id
    }));
  };

  const addNewItem = () => {
    form.setFieldValue('items', [
      ...items,
      {
        id: `${Math.random()}`,
        name: '',
        quantity: 1,
        price: 0,
        total: 0,
      }
    ]);
  }

  return (
    <div>
      <h3 className="text-2xl mb-4 text-gray-650 font-bold">Items List</h3>

      <div>
        <table className="w-full">
          <thead>
            <tr>
              <td className="pr-3 py-1 dark:text-white">
                Item Name
              </td>
              <td className="px-3 py-1 dark:text-white">
                Qty.
              </td>
              <td className="px-3 py-1 dark:text-white">
                Price</td>
              <td className="px-3 py-1 dark:text-white">
                Total
              </td>
              <td className="px-3 py-1 dark:text-white">
              </td>
            </tr>
          </thead>
          <tbody>
          {
            items.map((item: any) => (
              <InvoiceItem
                key={item.id}
                item={item}
                onChange={(field, value) => onChangeItem(item.id, field, value)}
                onRemove={() => onRemoveItem(item.id)}
              />
            ))
          }
          </tbody>
        </table>
      </div>

      <Button
        color="gray"
        className="w-full mt-4"
        type="button"
        onClick={addNewItem}
      >
        <Icon name="plus" className="mr-3" />
        Add New Item
      </Button>

    </div>
  );
};

export default ItemsList;