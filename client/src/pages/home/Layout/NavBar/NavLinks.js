import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NavLinks() {
  const { t, i18n } = useTranslation(["translation", "content"]);
  let normalClassName =
    "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
  let activeClassName =
    "block py-2 pl-3 pr-4 text-white rounded bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 dark:text-white";
  return (
    <>
      <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? activeClassName : normalClassName
            }
          >
            {t("menu_home")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/coins'
            className={({ isActive }) =>
              isActive ? activeClassName : normalClassName
            }
          >
            {t("Coins", { ns: "content" })}
          </NavLink>
        </li>
        {/* <li>
          <a
            href='/contact'
            className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
          >
            Contact
          </a>
        </li> */}
      </ul>
    </>
  );
}
