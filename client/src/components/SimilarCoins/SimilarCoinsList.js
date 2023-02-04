import React, { useEffect } from "react";
import SimilarCoinsItem from "./SimilarCoinsItem";
import { useDispatch, useSelector } from "react-redux";
import { getSimilarCoins } from "../../redux/stores/CoinSlice";

export default function SimilarCoinsList({ id }) {
  const { similarCoins, error, loading, serverResponse } = useSelector(
    (state) => state.coinReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSimilarCoins(id));
  }, [id]);

  return (
    <div className='text-gray-700 dark:text-gray-400 p-4 lg:border-l  dark:border-gray-800'>
      <h1 className='border-b dark:border-gray-800 mb-2'>Similar Coins</h1>
      <div className='flex flex-col gap-5'>
        {loading ? "Finding similar coins..." : null}
        {similarCoins?.map((coin) => {
          return <SimilarCoinsItem {...coin} key={coin.id} />;
        })}
      </div>
    </div>
  );
}
