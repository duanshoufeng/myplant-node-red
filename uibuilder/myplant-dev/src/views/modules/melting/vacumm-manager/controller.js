import "./service.js";
import "./addModal/service.js";
import Utils from "../../../../services/utils.js";
import { vacuumManagerOptions } from "./config.js";

let vacuumManagerGrid = {};

const onFilterTextBoxChanged = () => {
  vacuumManagerOptions.api.setQuickFilter(document.getElementById("filter-text").value);
};

let VacuumManagerComponent = {
  async render() {
    // html
    return (
      (await Utils.template("./views/modules/melting/vacumm-manager/view.html")) +
      (await Utils.template("./views/modules/melting/vacumm-manager/addModal/view.html"))
    );
  },

  async after_render() {
    try {
      vacuumManagerGrid = new agGrid.Grid(document.querySelector("#vacuumManager"), vacuumManagerOptions);
      vacuumManagerOptions.api.sizeColumnsToFit();
      document.getElementById("filter-text").oninput = onFilterTextBoxChanged;
    } catch (err) {
      console.error(err);
    }
  },
};

export default VacuumManagerComponent;
