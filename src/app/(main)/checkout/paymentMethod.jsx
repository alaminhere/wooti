'use client';

import { Truck, CreditCard } from 'lucide-react';

const paymentMethods = [
  {
    id: 'cod',
    title: 'Cash on Delivery',
    description: 'Pay when you receive',
    icon: Truck,
  },
  {
    id: 'card',
    title: 'Card Payment',
    description: 'Visa, Mastercard',
    icon: CreditCard,
  },
];

const PaymentMethod = ({ className, selected, setSelected }) => {
  return (
    <div className={`flex flex-col md:flex-row  gap-3 ${className}`}>
      {paymentMethods.map(item => (
        <div
          key={item.id}
          onClick={() => setSelected(item.id)}
          className={`border rounded-[10px] w-full p-4 flex items-center gap-3 cursor-pointer ${
            selected == item.id
              ? 'border-yellow bg-yellow/5'
              : 'border-gray-200 bg-whiteCustom'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              selected == item.id ? 'border-yellow' : 'border-gray-300'
            }`}
          >
            {selected == item.id && (
              <div className="w-2.5 h-2.5 rounded-full bg-yellow" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={selected === item.id ? 'text-yellow' : 'text-grey'}
            >
              <item.icon size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-deefBlack">
                {item.title}
              </p>
              <p className="text-xs text-grey">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;
