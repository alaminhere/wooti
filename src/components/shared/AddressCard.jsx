import React from 'react';
import StatusBar from './StatusBar';

const textStyles = {
  name: 'text-sm font-medium text-deepBlack',
  default: 'text-xs text-grey',
};

const AddressCard = ({
  status = '',
  name = '',
  email = '',
  phone = '',
  city = '',
  zip = '',
  country = '',
  address = '',
  className = '',
}) => {
  const rows = [
    [{ key: 'name', value: name }],
    [{ key: 'email', value: email }],
    [{ key: 'phone', value: phone }],
    [
      { key: 'city', value: city },
      { key: 'country', value: country },
    ],
    [
      { key: 'address', value: address },
      { key: 'zip', value: zip },
    ],
  ];

  return (
    <div
      className={`border border-gray-200 rounded-[8px] overflow-hidden ${className}`}
    >
      {status && <StatusBar status={status} />}

      <div className="px-5 py-4 flex flex-col gap-1">
        {rows.map((row, rowIndex) => {
          const visible = row.filter(f => f.value);
          if (visible.length === 0) return null;

          return (
            <div key={rowIndex} className="flex gap-1">
              {visible.map(({ key, value }) => (
                <p key={key} className={textStyles[key] || textStyles.default}>
                  {value}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddressCard;
