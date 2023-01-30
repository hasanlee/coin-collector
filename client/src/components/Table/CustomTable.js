import React from "react";

export default function CustomTable({ tableData }) {
  const column = Object.keys(tableData[0]);
  return (
    <>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {column?.map((data) => (
              <th key={data} scope='col' className='px-6 py-3'>
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => {
            return (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                {column?.map((v) => {
                  return <td className='px-6 py-4'>{data[v]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
