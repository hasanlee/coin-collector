import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLangChanger, toggleLang } from "../../redux/stores/ToggleSlice";
import Flag from "react-world-flags";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { t, i18n } = useTranslation(["translation", "content"]);
  const { langChanger, langList, lang } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const chnageHandler = (lang) => {
    dispatch(toggleLangChanger(!langChanger));
    dispatch(toggleLang(lang));
    i18n.changeLanguage(lang);
  };
  return (
    <>
      <button
        onClick={() => {
          dispatch(toggleLangChanger(!langChanger));
        }}
        type='button'
        className='inline-flex items-center justify-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
      >
        <div className='flex gap-2'>
          <Flag
            code={lang == "EN" ? "GB" : lang}
            width='24'
            className='rounded'
          />
          {lang}
        </div>
      </button>
      {langChanger ? (
        <div className='absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700'>
          <ul className='py-2' role='none'>
            {langList.map((lng) => {
              return (
                <>
                  <li key={lng}>
                    <button
                      onClick={() => {
                        chnageHandler(lng);
                      }}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                      role='menuitem'
                    >
                      <div className='inline-flex items-center gap-2'>
                        <Flag
                          code={lng == "EN" ? "GB" : lng}
                          width='24'
                          className='rounded'
                        />
                        <span>{lng}</span>
                      </div>
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
