import React, { useState } from "react";
import CustomCarousel from "../Carousel/CustomCarousel";
export default function CoinItem({
  faceImage,
  coinName,
  backImage,
  shortDescription,
  coinId,
  composition,
  type,
  price,
}) {
  return (
    <>
      <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <div className='flex items-center justify-center'>
          <div className='w-[60%]'>
            <CustomCarousel images={[faceImage, backImage]} />
          </div>
        </div>
        <div className='p-5'>
          <a href={"/coin/" + coinId}>
            <h5 className='mb-2 text-xl tracking-tight text-gray-900 dark:text-white'>
              {coinName}
            </h5>
          </a>
          <div class='flex items-center mt-2.5 mb-5'>
            <span class='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
              {type}
            </span>
            <span class='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
              {composition}
            </span>
          </div>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            {shortDescription}
          </p>
          <div class='flex items-center justify-between'>
            <span class='text-3xl font-bold text-gray-900 dark:text-white'>
              ${price}
            </span>
            <a
              href={"/coin/" + coinId}
              class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              View details
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
