import React, { useEffect } from "react";
import Header from "../Layout/Header";
import { Avatar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  coinFavorite,
  coinLike,
  checkFavorited,
  checkLiked,
  coinView,
} from "../../../redux/stores/UserActionsSlice";
import UserActions from "../../../components/UserActions/UserActions";
import { getCoinById } from "../../../redux/stores/CoinSlice";
import { NavLink, useParams } from "react-router-dom";
import NotFound from "../../../components/Errors/NotFound";
import SimilarCoinsList from "../../../components/SimilarCoins/SimilarCoinsList";
import { FaArrowLeft, FaCartPlus } from "react-icons/fa";
import { addToCart } from "../../../redux/stores/CartSlice";
import { useTranslation } from "react-i18next";

export default function DetailPage() {
  const { id } = useParams();
  const { coin, loading, error } = useSelector((state) => state.coinReducer);
  const { liked, favorited } = useSelector((state) => state.userActionsReducer);
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
  const { t, i18n } = useTranslation(["translation", "content"]);
  const dispatch = useDispatch();

  const checkUserActionStatus = (cId) => {
    dispatch(checkFavorited(cId));
    dispatch(checkLiked(cId));
  };

  const likeCoin = () => {
    dispatch(coinLike(id));
  };
  const favoriteCoin = () => {
    dispatch(coinFavorite(id));
  };

  const addCart = () => {
    dispatch(addToCart(coin));
  };

  useEffect(() => {
    dispatch(coinView(id));
    dispatch(getCoinById(id));
    checkUserActionStatus(id);
  }, [id]);
  return (
    <>
      <Header />
      {error ? (
        <NotFound message={error.message} />
      ) : (
        <main className='grid grid-cols-1 px-20 pt-1 md:grid-cols-1 lg:grid-cols-6 gap-5'>
          <div className='col-span-4'>
            <div className='mb-20 flex justify-between items-center'>
              <div className='flex items-center gap-3'>
                <NavLink to='/coins'>
                  <FaArrowLeft className='dark:text-white' />
                </NavLink>
                <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  {coinName}
                </h5>
              </div>
              <button
                onClick={addCart}
                className='flex items-center gap-1 text-gray-900 dark:text-white font-bold'
              >
                <FaCartPlus size={24} className='dark:text-white' />{" "}
                {t("add_to_cart")}
              </button>
            </div>
            <div className='grid lg:grid-cols-4 gap-5 md:grid-cols-1 sm:grid-cols-1'>
              <div className='lg:col-span-1 md:col-span-1 sm:col-span-1 flex lg:flex-col lg:gap-12 md:gap-6 md:flex-col md:justify-between sm:flex-col flex-col gap-5'>
                <div className='flex flex-row lg:flex-col lg:gap-12 md:flex-row sm:flex-row justify-around'>
                  <Avatar
                    img={process.env.REACT_APP_API_URL + faceImage}
                    rounded={true}
                    size='xl'
                  />
                  <Avatar
                    img={process.env.REACT_APP_API_URL + backImage}
                    rounded={true}
                    size='xl'
                  />
                </div>
                <UserActions
                  view_count={viewCount}
                  favorite_count={favoriteCount}
                  like_count={likeCount}
                  likeCoin={likeCoin}
                  favoriteCoin={favoriteCoin}
                  liked={liked}
                  favorited={favorited}
                />
              </div>
              <div className='lg:col-span-3 md:col-span-1 sm:col-span-1 flex flex-col justify-between gap-5'>
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
                      {t("Issuing Country", { ns: "content" })} :
                    </strong>
                    <strong className='border-b dark:border-gray-600'>
                      {t("Composition", { ns: "content" })} :
                    </strong>
                    <strong className='border-b dark:border-gray-600'>
                      {t("Quality", { ns: "content" })} :
                    </strong>
                    <strong className='border-b dark:border-gray-600'>
                      {t("Denomination", { ns: "content" })} :
                    </strong>
                    <strong className='border-b dark:border-gray-600'>
                      {t("Year", { ns: "content" })} :
                    </strong>
                    <strong className='border-b dark:border-gray-600'>
                      {t("Weight", { ns: "content" })} :
                    </strong>
                    <strong className='border-b dark:border-gray-600'>
                      {t("Price", { ns: "content" })} :
                    </strong>
                  </div>
                  <div className='flex flex-col'>
                    <p className='border-b dark:border-gray-600'>
                      {issuedByCountry || ""}
                    </p>
                    <p className='border-b dark:border-gray-600'>
                      {composition || ""}
                    </p>
                    <p className='border-b dark:border-gray-600'>{quality}</p>
                    <p className='border-b dark:border-gray-600'>
                      {denomination}
                    </p>
                    <p className='border-b dark:border-gray-600'>{year}</p>
                    <p className='border-b dark:border-gray-600'>{weight}</p>
                    <p className='border-b dark:border-gray-600'>{price} $</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-2'>
            <SimilarCoinsList id={id} />
          </div>
        </main>
      )}
    </>
  );
}
