import { chart } from "./index";
import { http } from "../../utils";

window._dashboards_gross_production = () => {
  return {
    async onInit() {
      try {
        const response = await http.get("/api/dashboard/gross-production");
        let data: any = response.data.map((x: any) => ({
          x: `${x.Month}月`,
          y: x.GrossProduction ?? 0,
          goals: [
            {
              name: "Expected",
              value: x.PlannedProduction,
              strokeHeight: 5,
              strokeColor: "#775DD0",
            },
          ],
        }));
        chart.updateSeries([{ data: data }]);
      } catch (error) {}
    },
    render() {},
  };
};
