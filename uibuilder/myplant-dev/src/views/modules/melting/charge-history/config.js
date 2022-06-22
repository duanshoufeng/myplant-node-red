export const feedingDataGridOptions = {
  suppressClickEdit: true,

  columnDefs: [
    { headerName: "炉号", field: "Tower", width: 120 },
    { headerName: "分组", field: "Category", width: 120 },
    { headerName: "分类", field: "Material", width: 120 },
    { headerName: "批次号", field: "BatchId", width: 120 },
    { headerName: "二维码", field: "CodeContent", width: 120 },
    { headerName: "重量", field: "Weight", width: 120 },
    { headerName: "操作者", field: "Employee", width: 120 },
    { headerName: "无污染物", field: "NoSubstance", width: 120 },
    { headerName: "无水分残留", field: "NoWaterExist", width: 120 },
  ],
  defaultColDef: {
    editable: false,
    resizable: true,
    filter: true,
    enableCellTextSelection: true,
  },
  rowData: [],
  animateRows: true,
  onGridReady(params) {
    let gridWidth = document.getElementById("feedingData").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: (params) => {
    let gridWidth = document.getElementById("feedingData").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (params) => {
    // get the current grids width
    let gridWidth = document.getElementById("feedingData") ? document.getElementById("feedingData").offsetWidth : 0;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  pagination: true,
  paginationAutoPageSize: true,
};

export const feedingChartOptions1 = {
  series: [],
  labels: ["新料", "旧料"],
  chart: {
    height: "300px",
    type: "donut",
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270,
    },
  },
  dataLabels: {
    enabled: true,
  },
  fill: {
    type: "gradient",
  },
  legend: {
    formatter: function (val, opts) {
      return val + " - " + opts.w.globals.series[opts.seriesIndex];
    },
  },
  animations: {
    enabled: false,
  },
  noData: {
    text: "Loading...",
  },
};

export const feedingChartOptions2 = {
  series: [],
  labels: ["铝锭", "烫模件", "报废缸体", "真空流道和渣包", "料饼", "切边余料"],
  chart: {
    height: "300px",
    type: "donut",
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270,
    },
  },
  dataLabels: {
    enabled: true,
  },
  fill: {
    type: "gradient",
  },
  legend: {
    formatter: function (val, opts) {
      return val + " - " + opts.w.globals.series[opts.seriesIndex];
    },
  },
  animations: {
    enabled: false,
  },
  noData: {
    text: "Loading...",
  },
};
