import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../../../redux/stores/CoinSlice";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
function TablerRow({ coin }) {
  const {
    coinId,
    coinName,
    shortDescription,
    description,
    issuedCountryId,
    issuedByCountry,
    compositionId,
    composition,
    qualityId,
    quality,
    denomination,
    year,
    weight,
    price,
    typeId,
    type,
    faceImage,
    backImage,
    viewCount,
    likeCount,
    favoriteCount,
  } = coin;
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
      <td
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {coinName}
      </td>
      <td className='px-6 py-4'>{composition}</td>
      <td className='px-6 py-4'>{issuedByCountry}</td>
      <td className='px-6 py-4'>{year}</td>
      <td className='px-6 py-4'>
        <a
          href={"coins/edit/" + coinId}
          className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
        >
          Edit
        </a>
      </td>
    </tr>
  );
}

export default function CoinList() {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector((state) => state.coinReducer);
  useEffect(() => {
    function fetchData() {
      dispatch(getAllCoins(""));
    }
    fetchData();
  }, []);
  return (
    <>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='flex justify-between'>
          <div className='pb-4 bg-white dark:bg-gray-900'>
            <label htmlFor='table-search' className='sr-only'>
              Search
            </label>
            <div className='relative mt-1'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
              <input
                type='text'
                id='table-search'
                className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search for coins'
              />
            </div>
          </div>
          <div className='pb-4 bg-white dark:bg-gray-900'>
            <div className='relative mt-1'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none dark:text-white'>
                <FaPlus />
              </div>
              <NavLink
                to='add/'
                className='w-full block p-2 pl-10 pr-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                Add new
              </NavLink>
            </div>
          </div>
        </div>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Product name
              </th>
              <th scope='col' className='px-6 py-3'>
                Color
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin) => {
              return <TablerRow coin={coin} key={coin.coinId} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
