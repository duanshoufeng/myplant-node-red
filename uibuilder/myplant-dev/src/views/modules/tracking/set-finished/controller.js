import "./service.js";
import Utils from "../../../../services/utils.js";
import http from "../../../../services/http.js";
import { gridOptions } from "./config";

const FinishedSetSearchComponent = {
  async render() {
    // html
    return await Utils.template("./views/modules/tracking/set-finished/view.html");
  },

  async after_render() {
    try {
      var grid = document.querySelector("#DMCGrid");
      new agGrid.Grid(grid, gridOptions);
      gridOptions.api.sizeColumnsToFit();
    } catch (err) {
      console.error(err);
    }
  },
};

export default FinishedSetSearchComponent;
