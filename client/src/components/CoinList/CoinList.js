import React, { useEffect, useState } from "react";
import { getAllCoins } from "../../services/coinApi";
import CoinItem from "./CoinItem";
import CoinDetailModal from "../Modals/CoinDetailModal";
import { useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useParams } from "react-router-dom";

export default function CoinList() {
  const { query } = useSelector((state) => state.searchReducer);
  const [parent, enableAnimations] = useAutoAnimate();
  const [coins, setCoins] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    async function fetchData() {
      await getAllCoins(query).then((res) => {
        setCoins(res);
      });
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
