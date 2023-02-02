import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { useNavigate, NavLink } from "react-router-dom";

export default function ProfileButton() {
  const decodedToken = decodeToken(Cookies.get("access_token"));
  const navigate = useNavigate();
  const user = { ...decodedToken };
  const handleSignOut = () => {
    console.log("sign out");
    Cookies.remove("access_token", { path: "/" });
    if (!decodedToken) {
      navigate("/");
    }
  };
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div>
        <button
          type='button'
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
          className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
          id='user-menu-button'
          aria-expanded='false'
          data-dropdown-placement='bottom'
        >
          <span className='sr-only'>Open user menu</span>
          <Avatar
            alt={user.username}
            img={user.avatarId || ""}
            rounded={true}
          />
        </button>
        {openMenu ? (
          <div className='absolute right-5 z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'>
            <div className='px-4 py-3'>
              <span className='block text-sm text-gray-900 dark:text-white'>
                {user.fullname || user.username}
              </span>
              <span className='block text-sm font-medium text-gray-500 truncate dark:text-gray-400'>
                {user.email}
              </span>
            </div>
            <ul className='py-2' aria-labelledby='user-menu-button'>
              {user.roleId === 1 ? (
                <li>
                  <NavLink
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                    to='/admin/dashboard'
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
              ) : null}
              <li>
                <NavLink
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  to='/profile'
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button
                  className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
