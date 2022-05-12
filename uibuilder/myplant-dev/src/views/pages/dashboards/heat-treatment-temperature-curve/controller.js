import "./service.js";
import Utils from "../../../../services/utils.js";
import {
  ht01Zone01Options,
  ht01Zone02Options,
  ht01Zone03Options,
  ht01Zone04Options,
  ht01Zone05Options,
  ht01Zone06Options,
  ht01Zone07Options,
} from "./config.js";

export let ht01Zone01 = {};
export let ht01Zone02 = {};
export let ht01Zone03 = {};
export let ht01Zone04 = {};
export let ht01Zone05 = {};
export let ht01Zone06 = {};
export let ht01Zone07 = {};

let timeId = 0;
const inactivityTime = () => {
  const signOut = () => {
    // do your task here
    localStorage.removeItem("my_token");
    Alpine.store("currentUser").init();
    window.location.assign("#/sign-in");
  };

  const resetTime = () => {
    clearTimeout(timeId);
    timeId = setTimeout(signOut, 1000 * 600); // logout after 10 mins inactivity
  };

  // events
  window.onload = resetTime;
  window.onclick = resetTime;
  window.onkeypress = resetTime;
  window.ontouchstart = resetTime;
  window.onmousemove = resetTime;
  window.onmousedown = resetTime;
  window.addEventListener("scroll", resetTime, true);
};

let HeatTreatmentTemperatureCurveComponent = {
  async render() {
    // html
    return await Utils.template("./views/pages/dashboards/heat-treatment-temperature-curve/view.html");
  },

  async after_render() {
    inactivityTime();

    try {
      ht01Zone01 = new ApexCharts(document.querySelector("#ht01Zone01"), ht01Zone01Options);
      ht01Zone01.render();
      ht01Zone02 = new ApexCharts(document.querySelector("#ht01Zone02"), ht01Zone02Options);
      ht01Zone02.render();
      ht01Zone03 = new ApexCharts(document.querySelector("#ht01Zone03"), ht01Zone03Options);
      ht01Zone03.render();
      ht01Zone04 = new ApexCharts(document.querySelector("#ht01Zone04"), ht01Zone04Options);
      ht01Zone04.render();
      ht01Zone05 = new ApexCharts(document.querySelector("#ht01Zone05"), ht01Zone05Options);
      ht01Zone05.render();
      ht01Zone06 = new ApexCharts(document.querySelector("#ht01Zone06"), ht01Zone06Options);
      ht01Zone06.render();
      ht01Zone07 = new ApexCharts(document.querySelector("#ht01Zone07"), ht01Zone07Options);
      ht01Zone07.render();
    } catch (error) {
      console.error(error);
    }
  },
};

export default HeatTreatmentTemperatureCurveComponent;
