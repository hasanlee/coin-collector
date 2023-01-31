import React, { useEffect, useState } from "react";
import NavBar from "../layout/NavBar/NavBar";
import SideBar from "../layout/SideBar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

export default function MainPage() {
  const navigate = useNavigate();
  const dekodedToken = decodeToken(Cookies.get("access_token"));
  useEffect(() => {
    if (!dekodedToken) {
      navigate("/login");
    }
  }, []);
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
