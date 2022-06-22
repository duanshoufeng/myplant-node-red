export const feedingChartPctOptions = {
  series: [
    {
      name: "旧料百分比",
      data: [],
    },
  ],
  chart: {
    height: "300px",
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "numeric",
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        let value = val * 100;
        return value.toFixed(1).toString() + "%";
      },
    },
  },
  markers: {
    size: 0,
  },
  animations: {
    enabled: false,
  },
  noData: {
    text: "Loading...",
  },
};
export const feedingChartWeightOptions = {
  series: [
    {
      name: "新料重量",
      data: [],
    },
    {
      name: "旧料重量",
      data: [],
    },
  ],
  chart: {
    height: "400px",
    type: "bar",
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  colors: ["#77B6EA", "#545454"],
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "date",
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return val.toFixed(1).toString();
      },
    },
  },
  markers: {
    size: 0,
  },
  animations: {
    enabled: false,
  },
  noData: {
    text: "Loading...",
  },
};
