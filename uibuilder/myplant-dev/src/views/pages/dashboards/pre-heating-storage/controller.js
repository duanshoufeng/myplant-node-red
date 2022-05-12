import "./service.js";
import Utils from "../../../../services/utils.js";
import { room01Options, room02Options, room03Options, room04Options, room05Options } from "./config.js";

export let room01 = {};
export let room02 = {};
export let room03 = {};
export let room04 = {};
export let room05 = {};

const PreHeatingStorageComponent = {
  async render() {
    // html
    return await Utils.template("./views/pages/dashboards/pre-heating-storage/view.html");
  },

  async after_render() {
    try {
      room01 = new agGrid.Grid(document.querySelector("#room01"), room01Options);
      room02 = new agGrid.Grid(document.querySelector("#room02"), room02Options);
      room03 = new agGrid.Grid(document.querySelector("#room03"), room03Options);
      room04 = new agGrid.Grid(document.querySelector("#room04"), room04Options);
      room05 = new agGrid.Grid(document.querySelector("#room05"), room05Options);
    } catch (error) {
      console.error(error);
    }
  },
};

export default PreHeatingStorageComponent;
