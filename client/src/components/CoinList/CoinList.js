import React, { useEffect } from "react";
import CoinItem from "./CoinItem";
import CoinDetailModal from "../Modals/CoinDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useParams } from "react-router-dom";
import { getAllCoins } from "../../redux/stores/CoinSlice";

export default function CoinList() {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector((state) => state.coinReducer);
  const { query } = useSelector((state) => state.searchReducer);
  const [parent, enableAnimations] = useAutoAnimate();
  const { slug } = useParams();

  useEffect(() => {
    function fetchData() {
      dispatch(getAllCoins(""));
    }
    fetchData();
  }, [query]);
  return (
    <>
      <CoinDetailModal />
      <div
        className='m-3 grid gap-5 lg:grid-cols-3 md:grid-cols-2'
        ref={parent}
      >
        {coins.map((coin) => {
          return <CoinItem key={coin.coinId} coin={coin} />;
        })}
      </div>
    </>
  );
}
