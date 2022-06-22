import { liveTickerOptions } from "../views/pages/home/config.js";

// uibuilder
const Uib = () => {
  uibuilder.start();

  uibuilder.onChange("msg", function (msg) {
    // register with success
    if (msg.topic === "live_ticker" && document.getElementById("liveTicker")) {
      liveTickerOptions.api.setRowData(msg.payload);
    }
    // refresh heat treatment temperature
    const isChartValid =
      document.getElementById("ht01Zone01") ||
      document.getElementById("ht01Zone02") ||
      document.getElementById("ht01Zone03") ||
      document.getElementById("ht01Zone04") ||
      document.getElementById("ht01Zone05") ||
      document.getElementById("ht01Zone06") ||
      document.getElementById("ht01Zone07");
    if (msg.topic === "heat_treatment_temperature_refresh" && isChartValid) {
      window.dispatchEvent(new CustomEvent("heat-treatment-temperature-refresh", { detail: msg.payload }));
    }
    // returns weight
    if (msg.topic === "returnsWeight" && document.getElementById("returnsWeight")) {
      window.dispatchEvent(new CustomEvent("send-weight", { detail: msg.payload }));
    }
    // refresh pre heating storage dashboard
    if (msg.topic === "pre-heating-storage-dashboard" && document.getElementById("pre-heating-storage-dashboard")) {
      window.dispatchEvent(new CustomEvent("update-casting-time", { detail: msg.payload }));
    }
    // refresh heating basket uploading screen
    if (msg.topic === "heating-basket-uploading-start" && document.getElementById("heating-basket-uploading")) {
      window.dispatchEvent(new CustomEvent("heating-basket-uploading-start", { detail: msg.payload }));
    }
    if (msg.topic === "heating-basket-uploading-stop" && document.getElementById("heating-basket-uploading")) {
      window.dispatchEvent(new CustomEvent("heating-basket-uploading-stop", { detail: msg.payload }));
    }
  });
};

export default Uib;
