import "./data";
import { xhr } from "../../utils";
import ApexCharts from "apexcharts";

const options = {
  chart: {
    type: "bar",
    height: "400px",
  },
  plotOptions: {
    bar: {
      columnWidth: "60%",
    },
  },
  colors: ["#00E396"],
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ["Actual", "Expected"],
    markers: {
      fillColors: ["#00E396", "#775DD0"],
    },
  },
  series: [{ name: "Actual", data: [] }],
  noData: {
    text: "Loading...",
  },
};

export let chart: ApexCharts;

export default function GrossProductionComponent() {
  return {
    async render() {
      // html
      return await xhr("./dashboards/gross-production/view.html");
    },

    async after_render() {
      try {
        chart = new ApexCharts(document.querySelector("#gross-casting"), options);
        chart.render();
      } catch (error) {
        console.error(error);
      }
    },
  };
}
