import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SelectBox({
  label,
  name,
  id,
  options,
  value,
  register,
  valueData,
  displayData,
}) {
  const { t, i18n } = useTranslation(["translation", "content"]);
  const [selectValue, setSelectValue] = useState(value);
  useEffect(() => {
    setSelectValue(value);
  }, [value]);
  return (
    <div>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {t(label, { ns: "content" })}
      </label>
      <select
        {...register}
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
        value={selectValue}
        name={name}
        id={id}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        <option value={0}>Choose a {label}</option>
        {options?.map((option) => {
          return (
            <option
              value={valueData ? option[valueData] : option.id}
              key={valueData ? option[valueData] : option.id}
            >
              {displayData ? option[displayData] : option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
