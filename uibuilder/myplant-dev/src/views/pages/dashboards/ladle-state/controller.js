import "./service.js";
import Utils from "../../../../services/utils.js";

const LadleStateComponent = {
  async render() {
    // html
    return await Utils.template("./views/pages/dashboards/ladle-state/view.html");
  },

  async after_render() {
    try {
    } catch (error) {
      console.error(error);
    }
  },
};

export default LadleStateComponent;
