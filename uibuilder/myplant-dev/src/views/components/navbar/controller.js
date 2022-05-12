import "./service.js";
import Utils from "../../../services/utils.js";

let Navbar = {
  async render() {
    // html
    return await Utils.template("./views/components/navbar/view.html");
  },

  async after_render() {},
};

export default Navbar;
