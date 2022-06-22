export const dmcDataChartOptions = {
  series: [
    {
      name: "新料",
      data: [0],
    },
    {
      name: "旧料",
      data: [0],
    },
  ],
  chart: {
    height: "100%",
    type: "bar",
    stacked: true,
    stackType: "100%",
    toolbar: {
      show: false,
    },
  },
  colors: ["#f4a460", "#f2cda0"],
  dataLabels: {
    formatter: function (val, opt) {
      return val.toFixed(1).toString() + "%";
    },
    style: {
      colors: ["#220a00"],
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  xaxis: {
    categories: ["投料比例"],
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return val.toFixed(1).toString() + "%";
      },
    },
  },
  animations: {
    enabled: false,
  },
  noData: {
    text: "Loading...",
  },
};
