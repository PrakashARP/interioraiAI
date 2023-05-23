import React, { useState } from "react";
import { SelectOptionsProps,Option } from "../../utils/types";

// interface Option {
//   label: string;
//   value: string;
// }

// interface SelectOptionsProps {
//   title: string;
//   options: Option[];
// }

// const SelectOptions: React.FC<SelectOptionsProps> = (props: { title:string, options:Option[] }) => {

const SelectOptions: React.FC<SelectOptionsProps> = (props: {  title: string, options: Option[]}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  console.log("props=======",props);
  
  if (Object.keys(props).length>0) {
   return <h1>No Content to render</h1> 
  }

  return (
    <div>
      <h2 className="mb-5 mt-5 block text-xl font-medium leading-6 text-white">
        {props.title}
      </h2>
      <select
        id={props.title.toLowerCase()}
        name={props.title.toLowerCase()}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
        onChange={handleValueChange}
        value={selectedValue}
      >
        <option value="">Select an option</option>
        {props.options.map((option) => (
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
