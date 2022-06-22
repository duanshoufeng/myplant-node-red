import "./service";
import Utils from "../../../../services/utils";
import { dmcDataChartOptions } from "./chartConfig";
import { dmcDataGridOptions } from "./gridConfig";

export let dmcDataChart = {};
let dmcDataGrid = {};

// template
let MaterialFeedingComponent = {
  async render() {
    // html
    return await Utils.template("./views/modules/melting/material-feeding/view.html");
  },

  async after_render() {
    try {
      dmcDataChart = new ApexCharts(document.querySelector("#dmcDataChart"), dmcDataChartOptions);
      dmcDataChart.render();

      dmcDataGrid = new agGrid.Grid(document.querySelector("#dmcDataList"), dmcDataGridOptions);
      dmcDataGridOptions.api.sizeColumnsToFit();
    } catch (err) {
      console.error(err);
    }
  },
};

export default MaterialFeedingComponent;
