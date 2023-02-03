import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoinTypes } from "../../redux/stores/CoinSlice";
import OverlayLoading from "../LoadingSpinner/OverlayLoading";
import CategoryItem from "./CategoryItem";
import CustomToast from "../Toast/CustomToast";

export default function CategoryList() {
  const { query } = useSelector((state) => state.searchReducer);
  const { types, loading, error } = useSelector((state) => state.coinReducer);
  const dispatch = useDispatch();
  const [parent] = useAutoAnimate();

  useEffect(() => {
    function fetchData() {
      dispatch(getAllCoinTypes(query));
    }
    fetchData();
  }, [query]);
  return (
    <>
      {loading ? <OverlayLoading /> : null}
      {error ? (
        <CustomToast type='failure' message={error?.message} show={true} />
      ) : null}
      <div
        className='m-3 grid gap-5 lg:grid-cols-3 md:grid-cols-2'
        ref={parent}
      >
        {types.map((type) => {
          return <CategoryItem {...type} key={type.id} />;
        })}
      </div>
    </>
  );
}
