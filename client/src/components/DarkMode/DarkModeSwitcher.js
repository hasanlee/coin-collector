import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../redux/stores/SettingSlice";

export default function DarkModeSwitcher() {
  const { darkMode } = useSelector((state) => state.setting);
  // const htmlEl = document.querySelector("html");
  const dispatch = useDispatch();
  const switchTheme = () => {
    dispatch(toggleDarkMode(!darkMode));
  };
  // useEffect(() => {
  //   switch (darkMode) {
  //     case true:
  //       htmlEl.classList.add("dark");
  //       break;
  //     default:
  //       htmlEl.classList.remove("dark");
  //       break;
  //   }
  // }, [darkMode]);
  return (
    <div>
      <h1 onClick={switchTheme} className='text-3xl cursor-pointer select-none'>
        {darkMode ? "🌇" : "🌃"}
      </h1>
    </div>
  );
}
