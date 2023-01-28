import React from "react";
import NavBar from "../layout/NavBar/NavBar";
import SideBar from "../layout/SideBar/SideBar";
import { Outlet } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <NavBar />
      <SideBar />
      <div className='p-4 sm:ml-64'>
        <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
          <Outlet />
        </div>
      </div>
    </>
  );
}
