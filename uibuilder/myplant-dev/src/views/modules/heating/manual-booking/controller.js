import "./service.js";
import Utils from "../../../../services/utils.js";

const HeatingManulBookingComponent = {
  async render() {
    // html
    return await Utils.template("./views/modules/heating/manual-booking/view.html");
  },

  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  async after_render() {
    const element = document.getElementById("partNumberSelector");
    element.addEventListener(
      "change",
      function (event) {
        // do something creative here...
        window.dispatchEvent(new CustomEvent("part-number-change", { detail: event.detail.value }));
      },
      false
    );
  },
};

export default HeatingManulBookingComponent;
