import http from "../../../../services/http.js";
import { vacuumManagerOptions } from "./config.js";

window.VacuumManagerService = () => {
  return {
    onExport() {
      vacuumManagerOptions.api.exportDataAsCsv();
    },
    async onInit() {
      vacuumManagerOptions.api.showLoadingOverlay();
      // last 30 days bookings
      const response = await http.get(`/api/melting/vacuum/data`);
      vacuumManagerOptions.api.setRowData(response.data);
    },
  };
};
