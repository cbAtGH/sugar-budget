import { React } from "react";
import "luxon";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import getChroma from "../utils/chromaColor";

const MenuGraph = ({ period, data }) => {
  const c = getChroma();
  let width, height, gradient;
  const getGradient = (ctx, chartArea) => {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(0, c(0));
      gradient.addColorStop(0.5, c(0.5));
      gradient.addColorStop(1.0, c(1));
    }

    return gradient;
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Sugar Budget Data for the ${
          period.charAt(0).toUpperCase() + period.slice(1)
        }`,
      },
    },
    scales: {
      x: {
        type: "time",
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        type: "linear",
        beginAtZero: true,
        min: 0,
        title: {
          display: true,
          text: "Sugar (g)",
        },
      },
    },
  };

  const mappedData =
    data == null || Object.keys(data[period]).length === 0
      ? []
      : data[period].sugarTotals.map((day) => {
          const x = day.date.dateFull;
          if (day.totals)
            return { x: x, y: day.totals.reduce((p, c) => p + c.total, 0) };
        });

  // TODO:  implement logic to separate breakfast and lunch totals out into two arrays for mapping two datasets
  const chartData = {
    datasets: [
      {
        label: "",
        data: mappedData, // TODO: change to discrete breakfast/lunch datasets
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
          return getGradient(ctx, chartArea);
        },
      },
    ],
  };
  return <Line options={options} data={chartData} />;
};

export default MenuGraph;
