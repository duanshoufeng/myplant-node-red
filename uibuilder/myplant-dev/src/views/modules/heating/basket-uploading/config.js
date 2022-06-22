function basketCellRenderer(params) {
  let eGui = document.createElement("div");

  let url = "https://chqnoris.as.nemak.net/nts/nts/dmc/view/" + params.data.dmc;

  eGui.innerHTML = `
          <button id="detail-btn" @click="window.open('${url}')"
            class="bg-green-300 text-sm text-blue-700 py-1 px-4 border border-blue-500 rounded">
            ${params.data.dmc}
          </button>
          `;

  return eGui;
}

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
  { headerName: "二维码", field: "dmc", minWidth: 240, cellRenderer: basketCellRenderer, colId: "dmc" },
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
  suppressCellFocus: true,

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
