import React, { FC } from 'react';
import Input from 'components/Input';
import Icon from 'components/Icon';
import { IInvoiceItem } from '../../../resources/interfaces';

interface InvoiceItemProps {
  item: IInvoiceItem,
  onChange: (field: string, value: any) => void;
  onRemove: () => void;
}

const InvoiceItem: FC<InvoiceItemProps> = ({
  item,
  onChange,
  onRemove,
}) => {
  return (
    <tr>
      <td className="pr-3 py-1">
        <Input
          value={item.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </td>
      <td className="px-3 py-1">
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => onChange('quantity', e.target.value)}
        />
      </td>
      <td className="px-3 py-1">
        <Input
          type="number"
          value={item.price}
          onChange={(e) => onChange('price', e.target.value)}
        />
      </td>
      <td className="px-3 py-1 dark:text-white">
        {item.total.toFixed(2)}
      </td>
      <td className="px-3 py-1">
        <Icon className="cursor-pointer" name="delete" onClick={onRemove} />
      </td>
    </tr>
  );
};

export default InvoiceItem;