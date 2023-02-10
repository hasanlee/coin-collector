import React from "react";
import DarkModeSwitcher from "../../../../components/DarkMode/DarkModeSwitcher";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Tooltip } from "flowbite-react";
import ProfileButton from "../../../../components/ProfileButton/ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../../redux/stores/ToggleSlice";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../../../components/LanguageSelector/LanguageSelector";

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const toggleSidebarClick = () => {
    dispatch(toggleSidebar());
  };
  return (
    <>
      <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                onClick={toggleSidebarClick}
                // data-drawer-target='admin-sidebar'
                // data-drawer-toggle='admin-sidebar'
                // aria-controls='admin-sidebar'
                type='button'
                className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              >
                <span className='sr-only'>Open sidebar</span>
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    clipRule='evenodd'
                    fillRule='evenodd'
                    d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                  ></path>
                </svg>
              </button>
              <div className='flex ml-2 md:mr-24'>
                <span className='flex justify-center items-center gap-2 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                  <Tooltip content='Back to Home' placement='right'>
                    <NavLink to='/'>
                      <FaHome className='dark:text-white' />
                    </NavLink>
                  </Tooltip>{" "}
                  {t("admin_brand_name")}
                </span>
              </div>
            </div>
            <div className='flex items-center'>
              <div className='flex items-center ml-3 gap-2'>
                <ProfileButton />
                <div className='mr-1'>
                  <DarkModeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
