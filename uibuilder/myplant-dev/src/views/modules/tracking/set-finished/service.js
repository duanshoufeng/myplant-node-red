import { gridOptions } from "./config";
import Utils from "../../../../services/utils.js";
import http from "../../../../services/http.js";

window.ReturnsBasketService = () => {
  return {
    setId: "",

    onExport() {
      gridOptions.api.exportDataAsCsv();
    },

    async onSubmit() {
      try {
        const setId = this.setId.split("\n").join(",");
        const response = await http.get("/api/tracking/finished-set-info", { params: { setId } });

        gridOptions.api.setRowData(response.data);
      } catch (error) {
        Utils.log(error);
      }
    },
  };
};
