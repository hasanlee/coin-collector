import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SidebarLink({ name, count, icon, to }) {
  const { t, i18n } = useTranslation(["translation", "content"]);
  let normalClassName =
    "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";
  let activeClassName =
    "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700";
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? activeClassName : normalClassName
        }
      >
        {icon}
        <span className='flex-1 ml-3 whitespace-nowrap'>
          {t(name, { ns: "content" })}
        </span>
        {count ? (
          <span className='inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300'>
            {count}
          </span>
        ) : (
          ""
        )}
      </NavLink>
    </li>
  );
}
