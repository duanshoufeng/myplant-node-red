import http from "../../../services/http.js";

function onFirstDataRendered(params) {
  let gridWidth = document.getElementById("liveTicker").offsetWidth;
  if (gridWidth > 0) params.api.sizeColumnsToFit();
}

function onGridSizeChanged(params) {
  // get the current grids width
  let gridWidth = document.getElementById("liveTicker") ? document.getElementById("liveTicker").offsetWidth : 0;
  if (gridWidth > 0) params.api.sizeColumnsToFit();
}

const columnDefs = [
  {
    headerValueGetter: (params) => i18next.t("tk_live_ticker"),
    children: [
      { headerValueGetter: (params) => i18next.t("tk_dmc"), field: "DMC", menuTabs: [] },
      { headerValueGetter: (params) => i18next.t("tk_product"), field: "Product", menuTabs: [] },
      { headerValueGetter: (params) => i18next.t("tk_process"), field: "Process", menuTabs: [] },
      { headerValueGetter: (params) => i18next.t("tk_date"), field: "TimeStamp", menuTabs: [] },
    ],
  },
];

export const liveTickerOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    resizable: true,
  },
  groupHeaderHeight: 75,
  rowData: [],
  animateRows: true,
  getRowId: (params) => params.data.id,
  onGridReady(params) {
    let gridWidth = document.getElementById("liveTicker").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: onFirstDataRendered,
  onGridSizeChanged: onGridSizeChanged,
};
