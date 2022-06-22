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

export const dmcDataGridOptions = {
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
    {
      headerName: "操作",
      width: 120,
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action",
      suppressSizeToFit: true,
    },
    { headerName: "炉号", field: "Machine", width: 120 },
    { headerName: "二维码", field: "DMC", width: 120 },
    { headerName: "分类", field: "Category", width: 120 },
    { headerName: "分级", field: "Level", width: 120 },
    { headerName: "重量", field: "Weight", width: 120 },
    { headerName: "操作者", field: "Person", width: 120 },
    { headerName: "无污染物", field: "IsClean", width: 120 },
    { headerName: "无水分残留", field: "IsDry", width: 120 },
  ],
  defaultColDef: {
    editable: false,
    resizable: true,
    filter: true,
  },
  rowData: [],
  onGridReady: (event) => null,
  pagination: true,
  paginationAutoPageSize: true,
};

export const feedingDataGridOptions = {
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
  // pivotMode: true,
  // sideBar: "columns",
  columnDefs: [
    { headerName: "炉号", field: "Tower", width: 120, rowGroup: true, enableRowGroup: true },
    { headerName: "分组", field: "Category", width: 120, rowGroup: true, enableRowGroup: true },
    { headerName: "分类", field: "Material", width: 120, rowGroup: true, enableRowGroup: true },
    { headerName: "批次号", field: "BatchId", width: 120, rowGroup: true, enableRowGroup: true },
    { headerName: "二维码", field: "CodeContent", width: 120 },
    { headerName: "重量", field: "Weight", width: 120, aggFunc: "sum" },
    { headerName: "操作者", field: "Employee", width: 120 },
    { headerName: "无污染物", field: "NoSubstance", width: 120 },
    { headerName: "无水分残留", field: "NoWaterExist", width: 120 },
  ],
  defaultColDef: {
    editable: false,
    resizable: true,
    filter: true,
  },
  rowData: [],
  onGridReady: (event) => null,
  pagination: true,
  paginationAutoPageSize: true,
};
