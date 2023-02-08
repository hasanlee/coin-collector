import React, { useEffect, useState } from "react";
import CoinItem from "./CoinItem";
import CoinDetailModal from "../Modals/CoinDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useParams } from "react-router-dom";
import { getAllCoins } from "../../redux/stores/CoinSlice";
import OverlayLoading from "../LoadingSpinner/OverlayLoading";
import CustomPagination from "../Pagination/CustomPagination";

export default function CoinList() {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector((state) => state.coinReducer);
  const { query } = useSelector((state) => state.searchReducer);
  const [parent, enableAnimations] = useAutoAnimate();
  const { slug } = useParams();
  const searchQuery = slug ? (query ? "&type=" + slug : "?type=" + slug) : "";
  //#region Pagination
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + Number(itemsPerPage);
  const pagetCoins = coins.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(coins.length / Number(itemsPerPage));

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % coins.length;
    setItemOffset(newOffset);
  };
  //#endregion

  useEffect(() => {
    function fetchData() {
      dispatch(getAllCoins(query + searchQuery));
    }
    fetchData();
  }, [query]);
  return (
    <>
      <CoinDetailModal />
      {loading ? <OverlayLoading /> : null}
      <div
        className='m-3 grid gap-5 lg:grid-cols-3 md:grid-cols-2'
        ref={parent}
      >
        {pagetCoins.map((coin) => {
          return <CoinItem key={coin.coinId} coin={coin} />;
        })}
      </div>

      <div className='flex justify-center gap-5'>
        <CustomPagination
          pageCount={pageCount}
          handlePageChange={handlePageClick}
        />
        <select
          onChange={(e) => {
            setItemsPerPage(e.target.value);
          }}
          className='select-none px-3 py-[6px] leading-tight text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        >
          <option value='3'>3</option>
          <option value='9'>9</option>
          <option value='15'>15</option>
          <option value='9999'>All</option>
        </select>
      </div>
    </>
  );
}
