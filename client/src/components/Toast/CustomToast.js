import React, { useEffect, useState } from "react";
import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiErrorWarningLine,
  RiInformationLine,
} from "react-icons/ri";
export default function CustomToast({ type, message, show, timeout = 8000 }) {
  const typeClassName =
    type === "failure"
      ? "text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
      : type === "warning"
      ? "text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200"
      : type === "success"
      ? "text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
      : "text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900";

  const [showToast, setShowToast] = useState(show);

  useEffect(() => {
    setShowToast(show);
    setTimeout(() => {
      setShowToast(false);
    }, timeout);
  }, [show]);
  return (
    <>
      {showToast ? (
        <div className='fixed z-50 top-2 left-1/2 transform -translate-x-1/2 animate-pulse'>
          <div
            id='toastEl'
            className='flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow dark:border dark:border-gray-700 text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800'
            role='alert'
          >
            <div
              className={
                "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 " +
                typeClassName
              }
            >
              {type === "failure" ? (
                <RiCloseCircleLine />
              ) : type === "warning" ? (
                <RiErrorWarningLine />
              ) : type === "success" ? (
                <RiCheckboxCircleLine />
              ) : (
                <RiInformationLine />
              )}
              <span className='sr-only'>Icon</span>
            </div>
            <div className='ml-3 text-sm font-normal'>
              {message || "Information"}
            </div>
            <button
              type='button'
              onClick={() => {
                setShowToast(false);
              }}
              className='ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
              data-dismiss-target='#toastEl'
              aria-label='Close'
            >
              <span className='sr-only'>Close</span>
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
