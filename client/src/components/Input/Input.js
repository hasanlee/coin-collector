import React from "react";

export default function Input({
  label,
  type,
  name,
  id,
  placeholder,
  required,
  onChange,
  value,
  icon,
  autoComplete,
}) {
  return (
    <div className='mb-6'>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <div className='flex'>
        {icon ? (
          <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
            {icon}
          </span>
        ) : (
          ""
        )}
        <input
          type={type}
          id={id}
          className={`${
            icon ? "rounded-none rounded-r-lg" : "rounded-lg"
          } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}
