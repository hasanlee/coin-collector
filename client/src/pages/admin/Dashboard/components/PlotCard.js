import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [2, 3, 5, 6, 7, 8, 30],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
export default function PlotCard() {
  return (
    <div>
      <Chart data={data} type='line' />
    </div>
  );
}
