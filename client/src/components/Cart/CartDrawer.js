import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/stores/ToggleSlice";

export default function CartDrawer() {
  const { cartDrawerOpen } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  return (
    <>
      {cartDrawerOpen ? (
        <div
          className={
            "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 " +
            (cartDrawerOpen ? "" : "translate-x-full")
          }
          tabIndex='-1'
        >
          <h5 className='inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400'>
            Cart
          </h5>
          <button
            onClick={() => {
              dispatch(toggleCart(false));
            }}
            type='button'
            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
          >
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
            <span className='sr-only'>Close cart</span>
          </button>
          {/* cart items */}
          <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
            Supercharge your hiring by taking advantage of our{" "}
            <a
              href='#'
              className='text-blue-600 underline dark:text-blue-500 hover:no-underline'
            >
              limited-time sale
            </a>{" "}
            for Flowbite Docs + Job Board. Unlimited access to over 190K
            top-ranked candidates and the #1 design job board.
          </p>
          {/* end cart items */}
          <div className='grid grid-cols-2 gap-4'>
            <NavLink
              to='/'
              className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Checkout{" "}
              <svg
                className='w-4 h-4 ml-2'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </NavLink>
          </div>
        </div>
      ) : null}
    </>
  );
}
