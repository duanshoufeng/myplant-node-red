function onFirstDataRendered(params) {
  let gridWidth = document.getElementById("dmcDataList").offsetWidth;
  if (gridWidth > 0) params.api.sizeColumnsToFit();
}

function onGridSizeChanged(params) {
  // get the current grids width
  let gridWidth = document.getElementById("dmcDataList") ? document.getElementById("dmcDataList").offsetWidth : 0;
  if (gridWidth > 0) params.api.sizeColumnsToFit();
}

const columnDefs = [
  { headerName: "二维码", field: "dmc", minWidth: 240 },
  { headerName: "设备", field: "machine" },
  { headerName: "产品", field: "product" },
  { headerName: "模具号", field: "tool" },
  {
    headerName: "生产日期",
    field: "ProdDate",
    valueFormatter: (params) => moment(params.data.ProdDate).format("YYYY-MM-DD"),
  },
  { headerName: "生产班次", field: "ProductionShift" },
  { headerName: "装框序号", field: "ToolDetailID" },
  { headerName: "批次号", field: "set_id" },
];

export const dmcDataGridOptions = {
  columnDefs,
  defaultColDef: {
    editable: false,
    resizable: true,
    filter: true,
  },
  suppressClickEdit: true,

  rowData: [],
  pagination: true,
  paginationAutoPageSize: true,
  onGridReady(params) {
    let gridWidth = document.getElementById("dmcDataList").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: onFirstDataRendered,
  onGridSizeChanged: onGridSizeChanged,
};
