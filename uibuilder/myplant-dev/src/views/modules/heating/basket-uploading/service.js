import http from "../../../../services/http";
import { dmcDataGridOptions } from "./config";

window.HeatingBasketUploadingService = () => {
  return {
    basket: "",
    result: 0,
    msg: "",
    async startLoading(payload) {
      try {
        NProgress.start();
        this.basket = payload.toString();
        let basket = payload;
        const response = await http.get("/api/trimming/parts-in-basket", { params: { basket } });
        // update ag-grid
        dmcDataGridOptions.api.setRowData(response.data);
      } catch (error) {
        NProgress.done();
        console.error(error);
      }
    },
    finishLoading(payload) {
      try {
        NProgress.done();
        this.result = payload.status;
        this.msg = payload.msg;
      } catch (error) {
        NProgress.done();
        console.error(error);
      }
    },
    async onInit() {
      try {
      } catch (error) {
        console.error(error);
      }
    },
  };
};
