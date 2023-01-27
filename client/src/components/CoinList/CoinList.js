import React, { useEffect, useState } from "react";
import { getAllCoins } from "../../services/coinApi";
import CoinItem from "./CoinItem";
import CoinDetailModal from "../Modals/CoinDetailModal";
import { useSelector } from "react-redux";

export default function CoinList() {
  const { query } = useSelector((state) => state.searchReducer);
  const [coins, setCoins] = useState([]);
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
      <div className='m-3 grid gap-5 lg:grid-cols-3 md:grid-cols-3'>
        {coins.map((coin) => {
          return (
            <>
              <CoinItem key={coin.coinId} coin={coin} />
            </>
          );
        })}
      </div>
    </>
  );
}
