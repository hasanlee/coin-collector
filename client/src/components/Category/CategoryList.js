import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoinTypes } from "../../redux/stores/CoinSlice";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {
  const { query } = useSelector((state) => state.searchReducer);
  const { types, loading, error } = useSelector((state) => state.coinReducer);
  const dispatch = useDispatch();
  const [parent, enableAnimations] = useAutoAnimate();

  useEffect(() => {
    function fetchData() {
      dispatch(getAllCoinTypes(""));
    }
    fetchData();
  }, [query]);
  return (
    <div className='m-3 grid gap-5 lg:grid-cols-3 md:grid-cols-2' ref={parent}>
      {types.map((type) => {
        return <CategoryItem {...type} key={type.id} />;
      })}
    </div>
  );
}
