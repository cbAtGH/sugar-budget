import { React } from "react";
import { DateTime } from "luxon";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const MenuGraph = ({ period, data }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Sugar Budget Data for the ${
          period.charAt(0).toUpperCase() + period.slice(1)
        }`,
      },
      scales: {
        x: {
          type: "time",
          time: {
            displayFormats: {
              day: "DD",
            },
            tooltipFormat: "DD MM YYYY",
          },
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Sugar (g)",
          },
        },
      },
    },
  };

  const mappedData =
    data != null && Object.keys(data[period]).length > 0
      ? data[period].sugarTotals.map((day) => {
          const x = day.date.dateFull;
          if (day.totals)
            return { x: x, y: day.totals.reduce((p, c) => p + c.total, 0) };
        })
      : [];

  // TODO:  implement logic to separate breakfast and lunch totals out into two arrays for mapping two datasets
  const chartData = {
    datasets: [
      {
        label: "",
        data: mappedData, // TODO: change to discrete breakfast/lunch datasets
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={chartData} />;
};

export default MenuGraph;
