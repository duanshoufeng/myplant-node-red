import "./service.js";
import Utils from "../../../services/utils.js";
import { liveTickerOptions } from "./config.js";

let liveTicker = {};

let HomeComponent = {
  async render() {
    // html
    return await Utils.template("./views/pages/home/view.html");
  },

  async after_render() {
    try {
      // liveTicker = new agGrid.Grid(document.querySelector("#liveTicker"), liveTickerOptions);
    } catch (error) {
      console.error(error);
    }
  },
};

export default HomeComponent;
