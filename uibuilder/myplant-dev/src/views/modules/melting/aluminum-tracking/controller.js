import "./service.js";
import Utils from "../../../../services/utils.js";

let AluminumTrackingComponent = {
  async render() {
    // html
    return await Utils.template("./views/modules/melting/aluminum-tracking/view.html");
  },

  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  async after_render() {},
};

export default AluminumTrackingComponent;
