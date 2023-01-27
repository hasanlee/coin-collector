import React, { useEffect, useState } from "react";
import { getAllCoins } from "../../services/coinApi";
import CoinItem from "./CoinItem";
import CoinDetailModal from "../Modals/CoinDetailModal";

export default function CoinList() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getAllCoins().then((res) => {
        setCoins(res);
      });
    }
    fetchData();
  }, []);
  return (
    <>
      <CoinDetailModal showModal={false} />
      <div className='m-3 grid gap-5 lg:grid-cols-3 md:grid-cols-3'>
        {coins.map((coin) => {
          return <CoinItem {...coin} key={coin.coinId} />;
        })}
      </div>
    </>
  );
}
