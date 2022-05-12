import { liveTickerOptions } from "./config.js";
import http from "../../../services/http.js";

window.HomeService = () => {
  return {
    async onInit() {
      try {
        // liveTickerOptions.api.showLoadingOverlay();
        // const response = await http.get(`/api/dashboard/live-ticker`);
        // liveTickerOptions.api.setRowData(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  };
};
