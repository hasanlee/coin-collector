import React, { useState } from "react";

export default function SelectBox({ label, name, id, options, value }) {
  const [selectValue, setSelectValue] = useState(value);
  return (
    <div className='mb-6'>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <select
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
        value={selectValue}
        name={name}
        id={id}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        <option>Choose a {label}</option>
        {options?.map((option) => {
          return (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
