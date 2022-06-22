function actionCellRenderer(params) {
  let eGui = document.createElement("div");

  eGui.innerHTML = `
            <button id="delete-btn"
              class="bg-transparent hover:bg-red-500 text-sm text-blue-700  hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
              data-action="delete">
                 删除
            </button>
            `;

  return eGui;
}

export const vacuumManagerOptions = {
  enableCharts: true,
  enableRangeSelection: true,
  suppressClickEdit: true,
  async onCellClicked(params) {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;

      if (action === "delete") {
        // remove from x-data
        window.dispatchEvent(new CustomEvent("delete-melting-charge-item", { detail: params.data }));
        // remove from grid
        // params.api.applyTransaction({
        //   remove: [params.node.data],
        // });
      }
    }
  },

  onRowEditingStarted: (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true,
    });
  },
  onRowEditingStopped: (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true,
    });
  },
  editType: "fullRow",
  columnDefs: [
    // {
    //   headerName: "操作",
    //   width: 120,
    //   cellRenderer: actionCellRenderer,
    //   editable: false,
    //   colId: "action",
    //   suppressSizeToFit: true,
    // },
    { headerName: "#", field: "ID", width: 120 },
    {
      headerName: "时间",
      field: "TimeString",
      width: 120,
      valueFormatter: (params) => moment(params.data.TimeString).format("YYYY-MM-DD HH:mm:ss"),
    },
    { headerName: "操作者", field: "Employee", width: 120 },
    { headerName: "炉号", field: "Furnace", width: 120 },
    { headerName: "试样编号", field: "Code", width: 120 },
    { headerName: "真空密度", field: "Vacuum", width: 120 },
    { headerName: "大气密度", field: "Atmospheric", width: 120 },
    {
      headerName: "密度指数",
      field: "Pct",
      width: 120,
      valueFormatter: (params) => (params.data.Pct * 100).toFixed(3) + "%",
    },
    { headerName: "备注", field: "Comment", width: 120 },
  ],
  defaultColDef: {
    editable: false,
    resizable: true,
    filter: true,
  },
  rowData: [],
  animateRows: true,
  onGridReady(params) {
    let gridWidth = document.getElementById("vacuumManager").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: (params) => {
    let gridWidth = document.getElementById("vacuumManager").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (params) => {
    // get the current grids width
    let gridWidth = document.getElementById("vacuumManager") ? document.getElementById("vacuumManager").offsetWidth : 0;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  pagination: true,
  paginationAutoPageSize: true,
};
