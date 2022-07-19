import http from "../../../../services/http";
import { room01Options, room02Options, room03Options, room04Options, room05Options } from "./config";

window.PreHeatingStorageService = () => {
  return {
    async updateCastingTime(payload) {
      try {
        room01Options.api.showLoadingOverlay();
        room02Options.api.showLoadingOverlay();
        room03Options.api.showLoadingOverlay();
        room04Options.api.showLoadingOverlay();
        room05Options.api.showLoadingOverlay();
        const response = await http.get(`/api/dashboard/pre-heating-storage`);
        let room01Data = response.data.filter((x) => x.Room === "NCHQ-PHT-101");
        let room02Data = response.data.filter((x) => x.Room === "NCHQ-PHT-102");
        let room03Data = response.data.filter((x) => x.Room === "NCHQ-PHT-103");
        let room04Data = response.data.filter((x) => x.Room === "NCHQ-PHT-104");
        let room05Data = response.data.filter((x) => x.Room === "NCHQ-PHT-105");
        room01Options.api.setRowData(room01Data);
        room02Options.api.setRowData(room02Data);
        room03Options.api.setRowData(room03Data);
        room04Options.api.setRowData(room04Data);
        room05Options.api.setRowData(room05Data);
      } catch (error) {
        console.error(error);
      }
    },
    async onInit() {
      try {
        room01Options.api.showLoadingOverlay();
        room02Options.api.showLoadingOverlay();
        room03Options.api.showLoadingOverlay();
        room04Options.api.showLoadingOverlay();
        room05Options.api.showLoadingOverlay();
        const response = await http.get(`/api/dashboard/pre-heating-storage`);
        let room01Data = response.data.filter((x) => x.Room === "NCHQ-PHT-101");
        let room02Data = response.data.filter((x) => x.Room === "NCHQ-PHT-102");
        let room03Data = response.data.filter((x) => x.Room === "NCHQ-PHT-103");
        let room04Data = response.data.filter((x) => x.Room === "NCHQ-PHT-104");
        let room05Data = response.data.filter((x) => x.Room === "NCHQ-PHT-105");
        room01Options.api.setRowData(room01Data);
        room02Options.api.setRowData(room02Data);
        room03Options.api.setRowData(room03Data);
        room04Options.api.setRowData(room04Data);
        room05Options.api.setRowData(room05Data);
      } catch (error) {
        console.error(error);
      }
    },
  };
};
