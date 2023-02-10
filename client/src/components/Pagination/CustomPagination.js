import React from "react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

export default function CustomPagination({ pageCount, handlePageChange }) {
  const { t, i18n } = useTranslation();
  return (
    <div className='flex justify-center'>
      {pageCount === 0 ? (
        <h6 className='text-lg font-bold dark:text-white'>
          {t("not_item_found")}
        </h6>
      ) : (
        <ReactPaginate
          pageCount={pageCount}
          pageRange={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"inline-flex items-center -space-x-px"}
          previousLinkClassName={
            "select-none px-3 py-[6px] leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }
          breakClassName={
            "select-none px-3 py-[6px] leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }
          nextLinkClassName={
            "select-none px-3 py-[6px] leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }
          pageClassName={
            "select-none px-3 py-[6px] leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }
          disabledClassName={"cursor-not-allowed"}
          activeClassName={
            "select-none px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          }
        />
      )}
    </div>
  );
}
