import "./service.js";
import Utils from "../../../../services/utils.js";
import { dmcDataGridOptions } from "./config.js";

let dmcDataGrid = {};

const HeatingBasketUploadingComponent = {
  async render() {
    // html
    return await Utils.template("./views/modules/heating/basket-uploading/view.html");
  },

  async after_render() {
    try {
      dmcDataGrid = new agGrid.Grid(document.querySelector("#dmcDataList"), dmcDataGridOptions);
      dmcDataGridOptions.api.sizeColumnsToFit();
    } catch (error) {
      console.error(error);
    }
  },
};

export default HeatingBasketUploadingComponent;
