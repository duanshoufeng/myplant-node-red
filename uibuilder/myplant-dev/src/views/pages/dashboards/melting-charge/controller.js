import "./service";
import Utils from "../../../../services/utils";
import { feedingChartPctOptions, feedingChartWeightOptions } from "./config";

export let feedingChartPct = {};
export let feedingChartWeight = {};

let MeltingChargeDashboardComponent = {
  async render() {
    // html
    return await Utils.template("./views/pages/dashboards/melting-charge/view.html");
  },

  async after_render() {
    feedingChartPct = new ApexCharts(document.querySelector("#feedingChartPct"), feedingChartPctOptions);
    feedingChartPct.render();

    feedingChartWeight = new ApexCharts(document.querySelector("#feedingChartWeight"), feedingChartWeightOptions);
    feedingChartWeight.render();
  },
};

export default MeltingChargeDashboardComponent;
