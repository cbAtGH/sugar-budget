import { React } from "react";
import "luxon";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import getChroma from "../utils/chromaColor";
import { Dimmer, Header, Icon, Loader, Segment } from "semantic-ui-react";

const MenuGraph = ({ data, error, loading, period }) => {
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
      gradient.addColorStop(0.2, c(0.5));
      gradient.addColorStop(0.5, c(1));
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
      legend: { display: false },
    },
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "DD",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        type: "linear",
        beginAtZero: true,
        suggestedMax: 50,
        min: 0,
        title: {
          display: true,
          text: "Sugar (g)",
        },
      },
    },
  };
  const skipped = (ctx, value) =>
    ctx.p0.parsed.y === 0 || ctx.p1.parsed.y === 0 ? value : undefined;

  const mappedData =
    data == null || Object.keys(data[period]).length === 0
      ? []
      : data[period].sugarTotals.map((day) => {
          const x = day.date.dateFull;
          if (day.totals) {
            let mealSet = new Set();
            const y = day.totals.reduce((p, c) => {
              let mealName = c.mealBlock.split(" ")[0];
              if (mealSet.has(mealName)) return p;
              mealSet.add(mealName);
              return p + c.total;
            }, 0);
            return { x: x, y: y };
          }
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
        segment: {
          borderColor: (ctx) => skipped(ctx, "rgb(0,0,0,0.05)"),
          borderDash: (ctx) => skipped(ctx, [6, 6]),
        },
      },
    ],
  };
  return loading || error ? (
    <Segment placeholder>
      {loading ? (
        <Dimmer active inverted>
          <Loader indeterminate>Attempting to retrieve info</Loader>
        </Dimmer>
      ) : (
        <Header icon textAlign="center">
          <Icon name="exclamation triangle" size="small" />
          Failed to retrieve data, please wait a moment and try again.
        </Header>
      )}
    </Segment>
  ) : (
    <Line options={options} data={chartData} />
  );
};

export default MenuGraph;
