import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TextArea({
  label,
  name,
  id,
  placeholder,
  value,
  register,
}) {
  const { t, i18n } = useTranslation(["translation", "content"]);
  const [text, setText] = useState(value);
  useEffect(() => {
    setText(value);
  }, [value]);
  return (
    <div>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {t(label, { ns: "content" })}
      </label>
      <textarea
        {...register}
        id={id}
        name={name}
        rows='4'
        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder={t(placeholder, { ns: "content" })}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
