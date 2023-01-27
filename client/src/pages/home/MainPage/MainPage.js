import React from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Header from "../Layout/Header";
import CategoryList from "../../../components/Category/CategoryList";

export default function MainPage() {
  return (
    <>
      <Header />
      <main className='flex flex-col items-center w-full'>
        <div className='w-96 m-2'>
          <SearchBar />
        </div>
        <div>
          <CategoryList />
        </div>
      </main>
    </>
  );
}
