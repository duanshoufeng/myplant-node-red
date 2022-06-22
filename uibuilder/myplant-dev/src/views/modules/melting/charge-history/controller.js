import "./service";
import Utils from "../../../../services/utils";
import { feedingDataGridOptions, feedingChartOptions1, feedingChartOptions2 } from "./config.js";

let feedingDataGrid = {};
export let feedingChart1 = {};
export let feedingChart2 = {};

const onFilterTextBoxChanged = () => {
  feedingDataGridOptions.api.setQuickFilter(document.getElementById("filter-text").value);
};

let ChargeHistoryComponent = {
  async render() {
    // declare alpinejs state

    // html
    return await Utils.template("./views/modules/melting/charge-history/view.html");
  },

  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  async after_render() {
    try {
      feedingDataGrid = new agGrid.Grid(document.querySelector("#feedingData"), feedingDataGridOptions);
      feedingDataGridOptions.api.sizeColumnsToFit();
      document.getElementById("filter-text").oninput = onFilterTextBoxChanged;

      feedingChart1 = new ApexCharts(document.querySelector("#feedingChart1"), feedingChartOptions1);
      feedingChart1.render();
      feedingChart2 = new ApexCharts(document.querySelector("#feedingChart2"), feedingChartOptions2);
      feedingChart2.render();
    } catch (err) {
      console.error(err);
    }
  },
};

export default ChargeHistoryComponent;
