import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCoinTypes } from "../../services/coinApi";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {
  const { query } = useSelector((state) => state.searchReducer);
  const [parent, enableAnimations] = useAutoAnimate();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getAllCoinTypes(query).then((res) => {
        setTypes(res);
      });
    }
    fetchData();
  }, [query]);
  return (
    <div className='m-3 grid gap-5 lg:grid-cols-3 md:grid-cols-3' ref={parent}>
      {types.map((type) => {
        return <CategoryItem {...type} key={type.id} />;
      })}
    </div>
  );
}
