import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins, submitDeleteCoin } from "../../../redux/stores/CoinSlice";
import { NavLink } from "react-router-dom";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import Dialog from "../../../components/Dialog/Dialog";
import CustomToast from "../../../components/Toast/CustomToast";

export default function CoinList() {
  const dispatch = useDispatch();
  const { coins, loading, error, serverResponse } = useSelector(
    (state) => state.coinReducer
  );
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [coin, setCoin] = useState({});
  const deleteHandle = (id, name) => {
    setShowDialog(true);
    setCoin([...coins].find(({ coinId }) => coinId === id));
  };

  const submitDelete = () => {
    dispatch(submitDeleteCoin(coin.coinId));
    reloadData();
  };

  const searchOnTable = (searchText) => {
    setSearch(searchText);
  };
  const reloadData = () => {
    dispatch(getAllCoins(search));
  };

  useEffect(() => {
    setShowDialog(false);
  }, [serverResponse]);

  useEffect(() => {
    reloadData();
  }, [search]);
  return (
    <>
      {error ? (
        <CustomToast type='failure' message={error?.message} show={false} />
      ) : null}
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
                onChange={(e) => {
                  searchOnTable(e.target.value);
                }}
              />
              {loading ? (
                <Spinner
                  light={true}
                  className='absolute right-2.5 bottom-1.5'
                />
              ) : null}
            </div>
          </div>
          <div className='pb-4 mt-1 bg-white dark:bg-gray-900'>
            <NavLink
              to='add/'
              className='inline-flex gap-3 items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
            >
              <FaPlus className='text-green-400' />
              Add new
            </NavLink>
          </div>
        </div>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Coin name
              </th>
              <th scope='col' className='px-6 py-3'>
                Matal
              </th>
              <th scope='col' className='px-6 py-3'>
                Issued Country
              </th>
              <th scope='col' className='px-6 py-3'>
                Year
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin) => {
              return (
                <tr
                  key={coin.coinId}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <td
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {coin.coinName}
                  </td>
                  <td className='px-6 py-4'>{coin.composition}</td>
                  <td className='px-6 py-4'>{coin.issuedByCountry}</td>
                  <td className='px-6 py-4'>{coin.year}</td>
                  <td className='px-6 py-4'>
                    <div
                      className='inline-flex rounded-md shadow-sm'
                      role='group'
                    >
                      <NavLink
                        to={"edit/" + coin.coinId}
                        className='inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-blue-400 dark:hover:text-blue-500 dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
                      >
                        <FaEdit />
                      </NavLink>
                      <button
                        onClick={() => {
                          deleteHandle(coin.coinId, coin.coinName);
                        }}
                        className='inline-flex items-center px-4 py-2 text-sm font-medium text-red-500 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-red-400 dark:hover:text-red-500 dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Dialog
        show={showDialog}
        message={`Are you sure delete ` + coin.coinName + " ?"}
        okBtnType='failure'
        okText='Yes, delete'
        noText='No, cancel'
        noClick={() => {
          setShowDialog(false);
        }}
        okClick={submitDelete}
      />
    </>
  );
}
