import React, { useEffect } from "react";
import { FiDatabase, FiEye, FiHeart, FiStar } from "react-icons/fi";
import CountCard from "./components/CountCard";
import EmptyHolder from "./components/EmptyHolder";
import PlotCard from "./components/PlotCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalViews,
  getTotalFavorites,
  getTotalLikes,
  getTotalCoins,
  getCategoryStatistics,
} from "../../../redux/stores/DashboardSlice";

export default function Dashboard() {
  const {
    totalLikes,
    totalFavorites,
    totalCoinViews,
    totalCoins,
    categoryViewsStatistics,
  } = useSelector((state) => state.dashboardReducer);
  const dispatch = useDispatch();

  //#regionChartData
  const labels = categoryViewsStatistics.map((items) => items.categoryName);
  const datasets = [
    {
      label: "# of Views",
      data: categoryViewsStatistics.map((items) => items.totalViews),
      borderColor: "rgb(45, 212, 191)",
      borderWidth: 1,
      backgroundColor: "rgb(45, 212, 191,0.5)",
    },
  ];
  //#endregion

  useEffect(() => {
    dispatch(getTotalFavorites());
    dispatch(getTotalLikes());
    dispatch(getTotalViews());
    dispatch(getTotalCoins());
    dispatch(getCategoryStatistics());
  }, []);
  return (
    <>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4'>
        <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
          <CountCard
            title='Total Coins'
            color='orange'
            count={totalCoins}
            icon={<FiDatabase />}
          />
        </div>
        <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
          <CountCard
            title='Total Likes'
            color='red'
            count={totalLikes}
            icon={<FiHeart />}
          />
        </div>
        <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
          <CountCard
            title='Total Favorites'
            color='yellow'
            count={totalFavorites}
            icon={<FiStar />}
          />
        </div>
        <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
          <CountCard
            title='Total Views'
            color='blue'
            count={totalCoinViews}
            icon={<FiEye />}
          />
        </div>
      </div>
      <div className='flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
        {/* <EmptyHolder /> */}
        <PlotCard type='bar' labels={labels} dataSets={datasets} />
      </div>
      <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4'>
        <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
          <EmptyHolder />
        </div>
        <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
          <EmptyHolder />
        </div>
        <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
          <EmptyHolder />
        </div>
        <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
          <EmptyHolder />
        </div>
      </div>
    </>
  );
}
