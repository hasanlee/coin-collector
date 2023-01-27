import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { singIn } from "../../../services/coinApi";
import { showAlert } from "../../../redux/stores/ToggleSlice.js";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      password,
    };
    await singIn(formData).then((res) => {
      console.log(res);
      if (res && res.error) {
        dispatch(
          showAlert({
            head: "Login error",
            type: "failure",
            body: res.message,
            id: Math.random(),
          })
        );
        console.log(res.message);
      }
    });
  };

  return (
    <>
      <div className='flex justify-center pt-[10%]'>
        <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-900 dark:border-gray-700'>
          <div className='mb-5 flex justify-between items-center'>
            <NavLink to='/'>
              <FaArrowLeft className='dark:text-white' />
            </NavLink>
            <NavLink to='/register'>
              <span className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
                Sign Up
              </span>
            </NavLink>
          </div>
          <form className='space-y-6' onSubmit={loginHandler}>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>
              Sign in to our platform
            </h5>
            <div>
              <label
                htmlFor='username'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Username
              </label>
              <input
                type='text'
                name='username'
                id='username'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                placeholder='username'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Login to your account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
