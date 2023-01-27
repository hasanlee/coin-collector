import React, { useEffect, useState } from "react";
import { getAllCoinTypes } from "../../services/coinApi";
import CategoryItem from "./CategoryItem";

export default function Categories() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getAllCoinTypes().then((res) => {
        setTypes(res);
      });
    }
    fetchData();
  }, []);
  return (
    <div className='m-3 grid gap-5 lg:grid-cols-3 md:grid-cols-3'>
      {types.map((type) => {
        return <CategoryItem {...type} key={type.id} />;
      })}
    </div>
  );
}
