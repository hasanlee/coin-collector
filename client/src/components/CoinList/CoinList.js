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
  //#region Pagination
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const pagetCoins = coins.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(coins.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % coins.length;
    setItemOffset(newOffset);
  };
  //#endregion

  useEffect(() => {
    function fetchData() {
      dispatch(getAllCoins(query));
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
      <CustomPagination
        pageCount={pageCount}
        handlePageChange={handlePageClick}
      />
    </>
  );
}
