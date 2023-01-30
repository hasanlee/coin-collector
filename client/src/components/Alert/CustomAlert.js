import { Alert } from "flowbite-react";
import React from "react";

export default function CustomAlert({ type, head, message, onDismiss }) {
  return (
    <div>
      <div className='flex flex-col gap-3 animate-pulse'>
        <Alert color={type || "info"} onDismiss={onDismiss}>
          <span>
            <span className='font-medium'>{head || ""} : </span>
            {message || ""}
          </span>
        </Alert>
      </div>
    </div>
  );
}
