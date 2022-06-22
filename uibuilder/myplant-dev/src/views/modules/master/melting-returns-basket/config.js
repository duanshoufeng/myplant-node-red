function actionCellRenderer(params) {
  let eGui = document.createElement("div");

  eGui.innerHTML = `
          <button id="update-btn" 
            class="bg-transparent hover:bg-blue-500 text-sm text-blue-700  hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"  
            data-action="edit">
               编辑
            </button>
            <button id="delete-btn"
            class="bg-transparent hover:bg-red-500 text-sm text-blue-700  hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
            data-action="delete">
               删除
          </button>
          `;

  return eGui;
}

export const basketOptions = {
  suppressClickEdit: true,
  async onCellClicked(params) {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;

      if (action === "edit") {
        window.dispatchEvent(new CustomEvent("melting-basket-edit", { detail: params.data.Id }));
      } else if (action === "delete") {
        window.dispatchEvent(new CustomEvent("melting-basket-delete", { detail: params.data.Id }));
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
  columnDefs: [
    {
      headerName: "操作",
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action",
      suppressSizeToFit: true,
    },
    { field: "Id", headerName: "#" },
    { field: "Number", headerName: "料框编号" },
    { field: "Weight", headerName: "重量" },
  ],
  defaultColDef: {
    editable: false,
    resizable: true,
    filter: true,
  },
  rowData: [],
  animateRows: true,
  onGridReady(params) {
    let gridWidth = document.getElementById("basketManager").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: (params) => {
    let gridWidth = document.getElementById("basketManager").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (params) => {
    // get the current grids width
    let gridWidth = document.getElementById("basketManager") ? document.getElementById("basketManager").offsetWidth : 0;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  pagination: true,
  paginationAutoPageSize: true,
};
