import React from "react";

export default function EmptyHolder({ text }) {
  return (
    <button
      onClick={() => {
        alert("Select Widget.");
      }}
      className='text-2xl text-gray-400 dark:text-gray-500'
    >
      {text || "+"}
    </button>
  );
}
