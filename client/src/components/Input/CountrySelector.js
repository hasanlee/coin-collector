import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function CountrySelector({
  label,
  name,
  id,
  required,
  countries,
}) {
  const [selected, setSelected] = useState({ name: "Azerbaijan", code: "AZ" });

  const onChangeHandler = (e) => {
    const selectedCountury = [...countries].filter(({ code }) => code === e);
    setSelected(selectedCountury[0]);
  };

  return (
    <div className='mb-6'>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <Listbox name={name} value={selected} onChange={onChangeHandler}>
        <div className='relative mt-1'>
          <Listbox.Button className='relative cursor-default text-left rounded-lg shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'>
            <span className='block truncate'>
              <div className='flex gap-3'>
                <Flag code={selected.code} width='32' className='rounded' />
                {selected.name}
              </div>
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white py-1 text-base shadow-sm dark:shadow-sm-light ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {countries?.map((country) => {
              return (
                <Listbox.Option
                  key={country.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-blue-500 text-white"
                        : "text-gray-900 dark:text-white"
                    }`
                  }
                  value={country.code}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        <div className='flex gap-3'>
                          <Flag
                            code={country.code}
                            width='32'
                            className='rounded'
                          />
                          {country.name}
                        </div>
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
      {/* <div className='flex items-center '>
        <button
          type='button'
          data-dropdown-toggle='language-dropdown-menu'
          className='rounded-lg shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
        >
          <div className='flex gap-5'>
            <Flag code='AZ' width='24' />
            <span>AZ</span>
          </div>
        </button>
        <div
          className='z-50 w-full hidden list-none divide-y divide-gray-100 rounded-lg shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
          id='language-dropdown-menu'
        >
          <ul role='none'>
            <li>
              <a href='#'>
                <div className='inline-flex'>
                  <Flag code='AZ' />
                  AZ
                </div>
              </a>
            </li>
            <li>
              <a href='#'>
                <div className='inline-flex'>
                  <Flag code='RU' />
                  RU
                </div>
              </a>
            </li>
            <li>
              <a href='#'>
                <div className='inline-flex'>
                  <Flag code='TR' />
                  TR
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
}
