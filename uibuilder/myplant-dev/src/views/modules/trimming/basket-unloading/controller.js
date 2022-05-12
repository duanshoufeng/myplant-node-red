import "./service.js";
import Utils from "../../../../services/utils.js";
import { dmcDataGridOptions } from "./config.js";

let dmcDataGrid = {};

let timeId = 0;
const signOut = () => {
  clearTimeout(timeId);

  // do your task here
  localStorage.removeItem("my_token");
  Alpine.store("currentUser").init();

  // let the user go back to the previous page when sign in by card
  localStorage.setItem("prevUrl", "#/trimming/basket-unloading");
  window.location.replace("#/sign-in");
};
const resetTime = () => {
  clearTimeout(timeId);
  timeId = setTimeout(signOut, 1000 * 600); // logout after 10 mins inactivity
  localStorage.setItem("timeId", timeId);
};

const inactivityTime = () => {
  resetTime();
  // events
  const page = document.getElementById("trimmingBasketUnloading");
  page.onmousemove = resetTime;
  page.onmousedown = resetTime;
  page.addEventListener("scroll", resetTime, true);
};

const TrimmingBasketUnloadingComponent = {
  async render() {
    // html
    return await Utils.template("./views/modules/trimming/basket-unloading/view.html");
  },

  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  async after_render() {
    inactivityTime();

    dmcDataGrid = new agGrid.Grid(document.querySelector("#dmcDataList"), dmcDataGridOptions);
    dmcDataGridOptions.api.sizeColumnsToFit();

    document.getElementById("basketNumberInput").focus();
  },
};

export default TrimmingBasketUnloadingComponent;
