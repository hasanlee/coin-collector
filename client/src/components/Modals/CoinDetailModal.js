import React, { useEffect } from "react";
import { Modal, Avatar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/stores/ToggleSlice";
import {
  coinFavorite,
  coinLike,
  coinView,
} from "../../redux/stores/UserActionsSlice";
import UserActions from "../UserActions/UserActions";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function CoinDetailModal() {
  const { coinDetail } = useSelector((state) => state.coinReducer);
  const { modalState } = useSelector((state) => state.toggle);
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
  } = coinDetail;
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(toggleModal(false));
  };

  useEffect(() => {
    if (modalState) {
      dispatch(coinView(coinId));
    }
  }, [modalState]);
  return (
    <>
      <Modal
        show={modalState}
        size='5xl'
        dismissible={true}
        onClose={closeModal}
      >
        <Modal.Header>{coinName}</Modal.Header>
        <Modal.Body>
          <div className='grid lg:grid-cols-4 gap-5 md:grid-cols-1 sm:grid-cols-1'>
            <div className='lg:col-span-1 md:col-span-1 sm:col-span-1 flex lg:flex-col lg:gap-12 md:gap-6 md:flex-col md:justify-between sm:flex-col flex-col gap-5'>
              <div className='flex flex-row lg:flex-col lg:gap-12 md:flex-row sm:flex-row justify-around'>
                <Avatar img={faceImage} rounded={true} size='xl' />
                <Avatar img={backImage} rounded={true} size='xl' />
              </div>
              <UserActions
                view_count={viewCount}
                favorite_count={favoriteCount}
                like_count={likeCount}
              />
            </div>
            <div className='lg:col-span-3 md:col-span-1 sm:col-span-1 flex flex-col gap-8'>
              <div className='flex flex-col gap-8'>
                <p className='font-normal text-gray-700 dark:text-gray-400 md:text-sm sm:text-sm text-ellipsis'>
                  {shortDescription}
                </p>
                <p className='font-normal text-gray-700 dark:text-gray-400 lg:text-base text-sm text-ellipsis'>
                  {description}
                </p>
              </div>
              <div className='grid grid-cols-2 text-gray-700 dark:text-gray-400 p-4 border rounded-t dark:border-gray-600'>
                <div className='flex flex-col'>
                  <strong className='border-b dark:border-gray-600 '>
                    Issuing Country :
                  </strong>
                  <strong className='border-b dark:border-gray-600'>
                    Composition :
                  </strong>
                  <strong className='border-b dark:border-gray-600'>
                    Quality :
                  </strong>
                  <strong className='border-b dark:border-gray-600'>
                    Denomination :
                  </strong>
                  <strong className='border-b dark:border-gray-600'>
                    Year :
                  </strong>
                  <strong className='border-b dark:border-gray-600'>
                    Weight :
                  </strong>
                </div>
                <div className='flex flex-col'>
                  <p className='border-b dark:border-gray-600'>
                    {issuedByCountry}
                  </p>
                  <p className='border-b dark:border-gray-600'>{composition}</p>
                  <p className='border-b dark:border-gray-600'>{quality}</p>
                  <p className='border-b dark:border-gray-600'>
                    {denomination}
                  </p>
                  <p className='border-b dark:border-gray-600'>{year}</p>
                  <p className='border-b dark:border-gray-600'>{weight}</p>
                </div>
              </div>
              <div className=' text-gray-700 dark:text-gray-400 p-4 border rounded-t dark:border-gray-600 '>
                <h3 className='border-b dark:border-gray-600 mb-2'>
                  Similar Coins
                </h3>
                <Swiper slidesPerView={4} spaceBetween={10} className=''>
                  <SwiperSlide>
                    <div class='flex items-center space-x-4'>
                      <Avatar rounded={true} />
                      <div class='font-medium dark:text-white'>
                        <div>Jefferson</div>
                        <div class='text-sm text-gray-500 dark:text-gray-400'>
                          US in 1923
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div class='flex items-center space-x-4'>
                      <Avatar rounded={true} />
                      <div class='font-medium dark:text-white'>
                        <div>Looney</div>
                        <div class='text-sm text-gray-500 dark:text-gray-400'>
                          CA in 1960
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
