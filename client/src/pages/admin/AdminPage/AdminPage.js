import React, { useEffect } from "react";
import NavBar from "../layout/NavBar/NavBar";
import SideBar from "../layout/SideBar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useJwt } from "react-jwt";

export default function MainPage() {
  const { decodedToken } = useJwt(Cookies.get("access_token"));
  const navigate = useNavigate();
  useEffect(() => {
    if (decodedToken) {
      //navigate("/login");
      console.log("ture olan", decodedToken);
    } else {
      console.log("false olan", decodedToken);
      //navigate("/login");
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
