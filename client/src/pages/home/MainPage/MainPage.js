import React from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Header from "../Layout/Header";
import Categories from "../../../components/Category/Categories";

export default function MainPage() {
  return (
    <>
      <Header />
      <main className='flex flex-col items-center w-full'>
        <div className='w-96 m-2'>
          <SearchBar />
        </div>
        <div>
          <Categories />
        </div>
      </main>
    </>
  );
}
