import "./service.js";
import Utils from "../../../../services/utils.js";

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
  const page = document.getElementById("pre-heating-booking");
  page.onmousemove = resetTime;
  page.onmousedown = resetTime;
  page.addEventListener("scroll", resetTime, true);
};

const PreHeatingTimeComponent = {
  async render() {
    // html
    return await Utils.template("./views/modules/heating/pre-heating-time/view.html");
  },

  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  async after_render() {
    inactivityTime();

    document.getElementById("checkInBasket").focus();
  },
};

export default PreHeatingTimeComponent;
