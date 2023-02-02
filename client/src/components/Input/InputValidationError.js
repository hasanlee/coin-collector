import React from "react";
import { ErrorMessage } from "@hookform/error-message";

export default function InputValidationError({ error }) {
  return (
    <>
      <p className='ml-2 mt-2 text-sm text-red-600 dark:text-red-500'>
        {error?.message}
      </p>
    </>
  );
}
