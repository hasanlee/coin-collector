import React from "react";
import CustomCarousel from "../Carousel/CustomCarousel";
import { Badge, Tooltip } from "flowbite-react";
import { FaEye, FaStar, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { viewCoinDetail } from "../../redux/stores/CoinSlice";
import { toggleModal } from "../../redux/stores/ToggleSlice";
import { NavLink } from "react-router-dom";
export default function CoinItem({ coin }) {
  const {
    coinId,
    coinName,
    shortDescription,
    description,
    issuedCountryId,
    issuedByCountry,
    compositionId,
    composition,
    qualityId,
    quality,
    denomination,
    year,
    weight,
    price,
    typeId,
    type,
    faceImage,
    backImage,
    viewCount,
    likeCount,
    favoriteCount,
  } = coin;
  const dispatch = useDispatch();
  const setDetail = () => {
    dispatch(viewCoinDetail(coin));
    dispatch(toggleModal(true));
  };
  return (
    <>
      <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <div className='flex items-center mt-2.5 mb-5'>
          <div className='flex flex-wrap gap-2 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3'>
            <Tooltip content='View'>
              <Badge>
                <div className='flex gap-1 justify-center items-center'>
                  <FaEye />
                  <p className='text-center'>{viewCount || "0"}</p>
                </div>
              </Badge>
            </Tooltip>
            <Tooltip content='Favorited'>
              <Badge color='warning'>
                <div className='flex gap-1 justify-center items-center'>
                  <FaStar />
                  <p className='text-center'>{favoriteCount || "0"}</p>
                </div>
              </Badge>
            </Tooltip>
            <Tooltip content='Likes'>
              <Badge color='failure'>
                <div className='flex gap-1 justify-center items-center'>
                  <FaHeart />
                  <p className='text-center'>{likeCount || "0"}</p>
                </div>
              </Badge>
            </Tooltip>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-[60%]'>
            <CustomCarousel images={[faceImage, backImage]} />
          </div>
        </div>
        <div className='p-5'>
          <button onClick={setDetail}>
            <h5 className='mb-2 text-xl tracking-tight text-gray-900 dark:text-white'>
              {coinName}
            </h5>
          </button>
          <div className='flex items-center mt-2.5 mb-5'>
            <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
              {type}
            </span>
            <Tooltip content='Composition'>
              <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
                {composition}
              </span>
            </Tooltip>
          </div>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2'>
            {shortDescription}
          </p>
          <div className='flex items-center justify-between'>
            <span className='text-3xl font-bold text-gray-900 dark:text-white'>
              ${price}
            </span>
            <NavLink
              to={"/coin/" + coinId}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              View details
            </NavLink>
            {/* <button
              onClick={setDetail}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              View details
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
