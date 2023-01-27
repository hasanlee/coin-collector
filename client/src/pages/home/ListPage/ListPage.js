import React from "react";
import CoinList from "../../../components/CoinList/CoinList";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Header from "../Layout/Header";

export default function ListPage() {
  return (
    <>
      <Header />
      <main className='flex flex-col items-center w-full'>
        <div className='w-96 m-2'>
          <SearchBar />
        </div>
        <div>
          <CoinList />
        </div>
      </main>
    </>
  );
}
