import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/stores/SearchSlice";
import { Modal } from "flowbite-react";
import Input from "../Input/Input";
import SelectBox from "../Input/SelectBox";
import {
  getAllCountries,
  getAllCoinTypes,
  getAllCompositions,
  getAllQualities,
} from "../../redux/stores/CoinSlice";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("?s=");
  const [showModal, setShowModal] = useState(false);
  const { types, countries, qualities } = useSelector(
    (state) => state.coinReducer
  );

  const dispatch = useDispatch();
  const pathname = window.location.pathname.split("/");
  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchText));
  };
  const onChageHandler = (e) => {
    setSearchText("?s=" + e.target.value);
    if (e.target.value.length < 3) {
      dispatch(setSearchQuery("?s="));
    }
  };

  const advancedSearchHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    var queryString = "?s=";
    formData.forEach((value, key) =>
      value != 0 ? (queryString = queryString + "&" + key + "=" + value) : ""
    );
    dispatch(setSearchQuery(queryString));
  };

  useEffect(() => {
    function fetchData() {
      dispatch(getAllCountries(""));
      dispatch(getAllCompositions(""));
      dispatch(getAllQualities(""));
      dispatch(getAllCoinTypes(""));
    }
    fetchData();
  }, []);
  return (
    <>
      <div className='w-full'>
        <form>
          <label
            htmlFor='default-search'
            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
          >
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
            </div>
            <input
              type='search'
              id='default-search'
              className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search Coins...'
              autoComplete='off'
              onChange={onChageHandler}
              required
            />
            <div className='absolute  right-2.5 bottom-2.5 flex'>
              <button
                type='submit'
                onClick={searchHandler}
                className={
                  (pathname.includes("coins")
                    ? "rounded-l-lg "
                    : "rounded-lg ") +
                  " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                }
              >
                Search
              </button>
              {pathname.includes("coins") ? (
                <button
                  type='button'
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                  className='text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  <svg
                    aria-hidden='true'
                    className='w-4 h-4 mr-2 fill-current'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z'></path>
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </div>
      <Modal
        show={showModal}
        size='xl'
        dismissible={true}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header>Advanced Search</Modal.Header>
        <Modal.Body>
          <form onSubmit={advancedSearchHandler}>
            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2'>
              <div className='col-span-2'>
                <div className='mb-6'>
                  <SelectBox
                    label='Issuing Country'
                    name='country'
                    id='country'
                    options={countries}
                    valueData='name'
                  />
                </div>
                <div className='mb-6'>
                  <SelectBox
                    label='Metal'
                    name='type'
                    id='type'
                    options={types}
                    valueData='name'
                  />
                </div>
                <div className='mb-6'>
                  <SelectBox
                    label='Quality of the coin'
                    name='quality'
                    id='quality'
                    options={qualities}
                    valueData='name'
                  />
                </div>
              </div>
              <div className='col-span-2'>
                <div className='flex gap-1'>
                  <div className='mb-6'>
                    <Input
                      label='Price from'
                      type='number'
                      id='priceMin'
                      name='priceMin'
                      autoComplete='off'
                    />
                  </div>
                  <div className='mb-6'>
                    <Input
                      label='to'
                      type='number'
                      id='priceMax'
                      name='priceMax'
                      autoComplete='off'
                    />
                  </div>
                </div>
                <div className='flex gap-1'>
                  <div className='mb-6'>
                    <Input
                      label='Year of issue from'
                      type='number'
                      id='yearMin'
                      name='yearMin'
                      autoComplete='off'
                    />
                  </div>
                  <div className='mb-6'>
                    <Input
                      label='to'
                      type='number'
                      id='yearMax'
                      name='yearMax'
                      autoComplete='off'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-end mx-3'>
              <button
                type='submit'
                className='inline-flex gap-3 items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
              >
                Search
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
