'use client';

import { useState } from 'react';
import { Switch } from '../ui/switch';

const NOTIFICATION_SETTINGS = [
  {
    key: 'orderUpdates',
    label: 'Order updates',
    description: 'Email when order status changes',
    defaultValue: true,
  },
  {
    key: 'promotions',
    label: 'Promotions',
    description: 'Deals and discount alerts',
    defaultValue: false,
  },
];

const Notification = ({ settings = NOTIFICATION_SETTINGS, onChange }) => {
  const [values, setValues] = useState(() =>
    Object.fromEntries(settings.map(s => [s.key, s.defaultValue ?? false])),
  );

  const handleToggle = (key, checked) => {
    setValues(prev => ({ ...prev, [key]: checked }));
    onChange?.(key, checked);
  };

  return (
    <div className="bg-whiteCustom border border-gray-200 rounded-xl p-5">
      <p className="text-sm font-semibold text-deepBlack mb-4">Notifications</p>

      <div className="flex flex-col gap-4">
        {settings.map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-deepBlack">{label}</p>
              <p className="text-xs text-grey">{description}</p>
            </div>
            <Switch
              checked={values[key]}
              onCheckedChange={checked => handleToggle(key, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
