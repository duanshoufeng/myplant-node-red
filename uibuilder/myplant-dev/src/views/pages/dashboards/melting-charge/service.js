import http from "../../../../services/http.js";
import { feedingChartPct, feedingChartWeight } from "./controller.js";

window.MeltingChargeDashboardService = () => {
  return {
    selectedDaysPct: 10,
    selectedDaysWeight: 10,
    selectedTowerPct: "T01",
    selectedTowerWeight: "T01",
    async onInit() {
      await this.updateChartPct();
      await this.updateChartWeight();
    },
    async updateChartPct() {
      feedingChartPct.updateSeries([{ data: [] }], false);

      const response = await http.get("/api/melting/data/days", {
        params: { days: this.selectedDaysPct, machine: this.selectedTowerPct },
      });

      const categories = response.data.map((x) => x.BatchId);
      const pct = response.data.map((x) => x.pct);

      feedingChartPct.updateOptions({
        xaxis: {
          categories: categories,
        },
        animate: false,
      });
      feedingChartPct.updateSeries([{ data: pct }], false);
    },
    async updateChartWeight() {
      feedingChartWeight.updateSeries([{ data: [] }, { data: [] }], false);

      const response = await http.get("/api/melting/data/days/weight", {
        params: { days: this.selectedDaysWeight, machine: this.selectedTowerWeight },
      });

      const categories = response.data.map((x) => x.ProductionDate.substring(0, 10));
      const ingots = response.data.map((x) => x.ingot);
      const returns = response.data.map((x) => x.returnable);

      feedingChartWeight.updateOptions({
        xaxis: {
          categories: categories,
        },
        animate: false,
      });
      feedingChartWeight.updateSeries([{ data: ingots }, { data: returns }], false);
    },
  };
};
