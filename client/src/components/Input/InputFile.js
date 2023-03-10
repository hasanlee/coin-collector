import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function InputFile({
  label,
  name,
  id,
  placeholder,
  imgHolder,
  register,
}) {
  const { t, i18n } = useTranslation(["translation", "content"]);
  const [picture, setPicture] = useState(null);
  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <div className='flex items-center justify-center w-full'>
        <label
          htmlFor={id}
          className='flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
        >
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            {picture ? (
              <img src={picture} alt='id' className='rounded-lg w-[30%]' />
            ) : imgHolder ? (
              <img
                src={process.env.REACT_APP_API_URL + imgHolder}
                alt='id'
                className='rounded-lg w-[30%]'
              />
            ) : (
              <svg
                aria-hidden='true'
                className='w-10 h-10 mb-3 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                ></path>
              </svg>
            )}
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              {t(label)}
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {t(placeholder, { ns: "content" })}
            </p>
          </div>
          <input
            name={name}
            id={id}
            type='file'
            className='hidden'
            onInput={onChangePicture}
            {...register}
          />
        </label>
      </div>
    </>
  );
}
