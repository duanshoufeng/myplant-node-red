import http from "../../../../services/http.js";
import { ht01Zone01, ht01Zone02, ht01Zone03, ht01Zone04, ht01Zone05, ht01Zone06, ht01Zone07 } from "./controller.js";

const doRefresh = async (payload) => {
  const response = await http.get("/api/dashboard/heat-treatment/temperature/501");

  if (payload === "zone01") {
    ht01Zone01.updateOptions({
      xaxis: {
        categories: response.data.filter((x) => x.MachineStation === 1).map((x) => x.TimeString),
      },
    });
    ht01Zone01.updateSeries([{ data: response.data.filter((x) => x.MachineStation === 1).map((x) => x.VarValue) }]);
  } else if (payload === "zone02") {
    ht01Zone02.updateOptions({
      xaxis: {
        categories: response.data.filter((x) => x.MachineStation === 2).map((x) => x.TimeString),
      },
    });
    ht01Zone02.updateSeries([{ data: response.data.filter((x) => x.MachineStation === 2).map((x) => x.VarValue) }]);
  } else if (payload === "zone03") {
    ht01Zone03.updateOptions({
      xaxis: {
        categories: response.data.filter((x) => x.MachineStation === 3).map((x) => x.TimeString),
      },
    });
    ht01Zone03.updateSeries([{ data: response.data.filter((x) => x.MachineStation === 3).map((x) => x.VarValue) }]);
  } else if (payload === "zone04") {
    ht01Zone04.updateOptions({
      xaxis: {
        categories: response.data.filter((x) => x.MachineStation === 4).map((x) => x.TimeString),
      },
    });
    ht01Zone04.updateSeries([{ data: response.data.filter((x) => x.MachineStation === 4).map((x) => x.VarValue) }]);
  } else if (payload === "zone05") {
    ht01Zone05.updateOptions({
      xaxis: {
        categories: response.data.filter((x) => x.MachineStation === 5).map((x) => x.TimeString),
      },
    });
    ht01Zone05.updateSeries([{ data: response.data.filter((x) => x.MachineStation === 5).map((x) => x.VarValue) }]);
  } else if (payload === "zone06") {
    ht01Zone06.updateOptions({
      xaxis: {
        categories: response.data.filter((x) => x.MachineStation === 6).map((x) => x.TimeString),
      },
    });
    ht01Zone06.updateSeries([{ data: response.data.filter((x) => x.MachineStation === 6).map((x) => x.VarValue) }]);
  } else {
    ht01Zone07.updateOptions({
      xaxis: {
        categories: response.data.filter((x) => x.MachineStation === 7).map((x) => x.TimeString),
      },
    });
    ht01Zone07.updateSeries([{ data: response.data.filter((x) => x.MachineStation === 7).map((x) => x.VarValue) }]);
  }
};

window.HeatTreatmentTemperatureCurveService = () => {
  return {
    async refreshTemperature(payload) {
      await doRefresh(payload);
    },
    async onInit() {
      try {
        await this.refreshTemperature("zone01");
        await this.refreshTemperature("zone02");
        await this.refreshTemperature("zone03");
        await this.refreshTemperature("zone04");
        await this.refreshTemperature("zone05");
        await this.refreshTemperature("zone06");
        await this.refreshTemperature("zone07");
      } catch (error) {
        console.error(error);
      }
    },
  };
};
