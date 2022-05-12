import Utils from "../../../services/utils.js";

let Sidebar = {
  async render() {
    // declare alpinejs

    // html
    return await Utils.template("./views/components/sidebar/view.html");
  },

  async after_render() {},
};

export default Sidebar;
