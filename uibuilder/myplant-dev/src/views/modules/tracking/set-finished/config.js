export const gridOptions = {
  enableCharts: true,
  enableRangeSelection: true,
  suppressClickEdit: true,

  columnDefs: [
    { headerName: "DMC", field: "dmc", width: 120 },
    { headerName: "产品", field: "product", width: 120 },
    {
      headerName: "压铸日期",
      field: "productionDate",
      width: 120,
      valueFormatter: (params) => moment(params.data.productionDate).format("YYYY-MM-DD"),
    },
    { headerName: "压铸班次", field: "productionShift", width: 120 },
    { headerName: "机台号", field: "machine", width: 120 },
    { headerName: "模具号", field: "tool", width: 120 },
    { headerName: "压铸批次", field: "castingSetId", width: 120 },
  ],
  defaultColDef: {
    editable: false,
    resizable: true,
    filter: true,
  },
  rowData: [],
  animateRows: true,
  onGridReady(params) {
    let gridWidth = document.getElementById("DMCGrid").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: (params) => {
    let gridWidth = document.getElementById("DMCGrid").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (params) => {
    // get the current grids width
    let gridWidth = document.getElementById("DMCGrid") ? document.getElementById("DMCGrid").offsetWidth : 0;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  pagination: true,
  paginationAutoPageSize: true,
};
