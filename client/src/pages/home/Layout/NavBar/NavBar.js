import React from "react";
import DarkModeSwitcher from "../../../../components/DarkMode/DarkModeSwitcher";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import ProfileButton from "../../../../components/ProfileButton/ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { toggleCart } from "../../../../redux/stores/ToggleSlice";

export default function NavBar() {
  const { authToken } = useSelector((state) => state.authReducer);
  const { cartDrawerOpen } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  return (
    <>
      <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900'>
        <div className='container flex flex-wrap items-center justify-between mx-auto'>
          <a href='/' className='flex items-center'>
            <img
              src='/logo.png'
              className='h-6 mr-3 sm:h-9'
              alt='Flowbite Logo'
            />
            <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
              Coin Collector
            </span>
          </a>
          <div className='flex md:order-2 gap-2'>
            {authToken ? <ProfileButton /> : <AuthButtons />}
            <button
              onClick={() => {
                dispatch(toggleCart(!cartDrawerOpen));
              }}
              type='button'
              className='relative text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800'
            >
              <FaCartPlus size={18} />
              <div class='absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900'>
                0
              </div>
            </button>
            <DarkModeSwitcher />
            <button
              data-collapse-toggle='navbar-cta'
              type='button'
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-cta'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-cta'
          >
            <NavLinks />
          </div>
        </div>
      </nav>
    </>
  );
}
