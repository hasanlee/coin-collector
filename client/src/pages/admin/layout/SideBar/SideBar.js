import React from "react";
import SidebarLink from "./SidebarLink";
import {
  RiDashboardLine,
  RiCoinLine,
  RiBrush3Line,
  RiAwardLine,
  RiTBoxLine,
  RiFlagLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";

export default function SideBar() {
  const { sideBarOpen } = useSelector((state) => state.toggle);
  return (
    <>
      <aside
        // id='admin-sidebar'
        className={
          "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200 sm:translate-x-0  dark:bg-gray-800 dark:border-gray-700 " +
          (sideBarOpen ? "" : "-translate-x-full")
        }
        // aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <ul className='space-y-2'>
            <SidebarLink
              name='Dashboard'
              count='12'
              icon={<RiDashboardLine />}
              to='/admin/dashboard'
            />
            <SidebarLink name='Coins' icon={<RiCoinLine />} to='/admin/coins' />
            <SidebarLink
              name='Compositions'
              icon={<RiBrush3Line />}
              to='/admin/compositions'
            />
            <SidebarLink name='Types' icon={<RiTBoxLine />} to='/admin/types' />
            <SidebarLink
              name='Qualities'
              icon={<RiAwardLine />}
              to='/admin/qualities'
            />
            <SidebarLink
              name='Countries'
              icon={<RiFlagLine />}
              to='/admin/countries'
            />
          </ul>
        </div>
      </aside>
    </>
  );
}
