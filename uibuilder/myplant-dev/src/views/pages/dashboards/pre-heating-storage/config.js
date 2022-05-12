function basketCellRenderer(params) {
  let eGui = document.createElement("div");

  if (params.data.ToCheckOut === 1) {
    eGui.innerHTML = `
          <button id="detail-btn" @click="window.open('https://chqnoris.as.nemak.net/nts/nts/set/detail/'+${params.data.SetId})"
            class="bg-green-300 text-sm text-blue-700 py-1 px-4 border border-blue-500 rounded">
            ${params.data.BasketString}
          </button>
          `;
  } else if (params.data.CastingHours > 24 && params.data.ToCheckOut !== 1) {
    eGui.innerHTML = `
          <button id="detail-btn" @click="window.open('https://chqnoris.as.nemak.net/nts/nts/set/detail/'+${params.data.SetId})"
            class="bg-blue-300 text-sm text-blue-700 py-1 px-4 border border-blue-500 rounded">
            ${params.data.BasketString}
          </button>
          `;
  } else if (params.data.CastingHours < 24 || params.data.CastingHours === 24) {
    eGui.innerHTML = `
          <button id="detail-btn" @click="window.open('https://chqnoris.as.nemak.net/nts/nts/set/detail/'+${params.data.SetId})"
            class="bg-yellow-300 text-sm text-blue-700 py-1 px-4 border border-blue-500 rounded">
            ${params.data.BasketString}
          </button>
          `;
  }

  return eGui;
}

function timeCellRenderer(params) {
  let eGui = document.createElement("div");

  if (params.data.ToCheckOut === 1) {
    eGui.innerHTML = `
          <button id="detail-btn" 
            class="bg-green-300 text-sm text-blue-700 py-1 px-4 border border-blue-500 rounded">
            ${params.data.CastingTime}
          </button>
          `;
  } else if (params.data.CastingHours > 24 && params.data.ToCheckOut !== 1) {
    eGui.innerHTML = `
          <button id="detail-btn" 
            class="bg-blue-300 text-sm text-blue-700 py-1 px-4 border border-blue-500 rounded">
            ${params.data.CastingTime}
          </button>
          `;
  } else if (params.data.CastingHours < 24 || params.data.CastingHours === 24) {
    eGui.innerHTML = `
          <button id="detail-btn" 
            class="bg-yellow-300 text-sm text-blue-700 py-1 px-4 border border-blue-500 rounded">
            ${params.data.CastingTime}
          </button>
          `;
  }

  return eGui;
}

const columnDefs = [
  {
    headerName: "框号",
    cellRenderer: basketCellRenderer,
    editable: false,
    colId: "basket",
  },
  {
    headerName: "距离压铸时间",
    cellRenderer: timeCellRenderer,
    editable: false,
    colId: "time",
  },
];

export const room01Options = {
  columnDefs,
  defaultColDef: {
    resizable: true,
  },
  rowData: [],
  animateRows: true,
  onGridReady(params) {
    let gridWidth = document.getElementById("room01").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: (params) => {
    let gridWidth = document.getElementById("room01").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (params) => {
    // get the current grids width
    let gridWidth = document.getElementById("room01") ? document.getElementById("room01").offsetWidth : 0;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
};

export const room02Options = {
  columnDefs,
  defaultColDef: {
    resizable: true,
  },
  rowData: [],
  animateRows: true,
  getRowId: (params) => params.data.id,
  onGridReady(params) {
    let gridWidth = document.getElementById("room02").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: (params) => {
    let gridWidth = document.getElementById("room02").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (params) => {
    // get the current grids width
    let gridWidth = document.getElementById("room02") ? document.getElementById("room02").offsetWidth : 0;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
};

export const room03Options = {
  columnDefs,
  defaultColDef: {
    resizable: true,
  },
  rowData: [],
  animateRows: true,
  getRowId: (params) => params.data.id,
  onGridReady(params) {
    let gridWidth = document.getElementById("room03").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: (params) => {
    let gridWidth = document.getElementById("room03").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (params) => {
    // get the current grids width
    let gridWidth = document.getElementById("room03") ? document.getElementById("room03").offsetWidth : 0;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
};

export const room04Options = {
  columnDefs,
  defaultColDef: {
    resizable: true,
  },
  rowData: [],
  animateRows: true,
  getRowId: (params) => params.data.id,
  onGridReady(params) {
    let gridWidth = document.getElementById("room04").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: (params) => {
    let gridWidth = document.getElementById("room04").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (params) => {
    // get the current grids width
    let gridWidth = document.getElementById("room04") ? document.getElementById("room04").offsetWidth : 0;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
};

export const room05Options = {
  columnDefs,
  defaultColDef: {
    resizable: true,
  },
  rowData: [],
  animateRows: true,
  getRowId: (params) => params.data.id,
  onGridReady(params) {
    let gridWidth = document.getElementById("room05").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onFirstDataRendered: (params) => {
    let gridWidth = document.getElementById("room05").offsetWidth;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (params) => {
    // get the current grids width
    let gridWidth = document.getElementById("room05") ? document.getElementById("room05").offsetWidth : 0;
    if (gridWidth > 0) params.api.sizeColumnsToFit();
  },
};
