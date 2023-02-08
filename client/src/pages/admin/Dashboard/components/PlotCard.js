import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function PlotCard({ labels, dataSets, type }) {
  const data = {
    labels: labels,
    datasets: dataSets,
  };
  return (
    <div>
      <Chart data={data} type={type} />
    </div>
  );
}
