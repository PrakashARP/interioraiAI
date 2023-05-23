import React, { useState } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectOptionsProps {
  title: string;
  options: Option[];
}

const SelectOptions: React.FC<SelectOptionsProps> = ({ title, options }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <h2 className='mb-5 mt-5 block text-xl font-medium leading-6 text-white'>{title}</h2>
      <select
        id={title.toLowerCase()}
        name={title.toLowerCase()}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
        onChange={handleValueChange}
        value={selectedValue}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p>Selected Value: {selectedValue}</p>
    </div>
  );
};

export default SelectOptions;
