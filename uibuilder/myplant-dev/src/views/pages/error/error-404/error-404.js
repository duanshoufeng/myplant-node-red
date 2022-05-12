import Utils from "../../../../services/utils.js";

let Error404 = {
  async render() {
    // declare alpinejs state

    // html
    return await Utils.template("./views/pages/error/error-404/error-404.html");
  },

  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  async after_render() {},
};

export default Error404;
