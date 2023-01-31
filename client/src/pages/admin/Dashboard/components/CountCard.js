import React from "react";
import { FaDashcube } from "react-icons/fa";
export default function CountCard({ icon, title, count, color = "blue" }) {
  const colorClass = `text-${color}-500 dark:text-${color}-200 bg-${color}-100 dark:bg-${color}-500`;
  return (
    <div className='w-full rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800'>
      <div className='p-4 flex items-center '>
        <div className={"p-3 rounded-full mr-4 " + colorClass}>
          {icon || <FaDashcube />}
        </div>
        <div>
          <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap'>
            {title || "Count"}
          </p>
          <p className='text-lg font-semibold text-gray-700 dark:text-gray-200  whitespace-nowrap'>
            {count || "0"}
          </p>
        </div>
      </div>
    </div>
  );
}
