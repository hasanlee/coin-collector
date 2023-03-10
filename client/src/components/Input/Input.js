import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Input({
  label,
  type,
  name,
  id,
  placeholder,
  required = false,
  value = "",
  icon,
  autoComplete,
  register,
}) {
  const { t, i18n } = useTranslation(["translation", "content"]);
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <div>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {t(label, { ns: "content" })}
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
          {...register}
          type={type}
          id={id}
          className={`${
            icon ? "rounded-none rounded-r-lg" : "rounded-lg"
          } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
          placeholder={t(placeholder, { ns: "content" }) || ""}
          name={name}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          required={required}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}
