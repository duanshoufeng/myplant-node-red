import "./service.js";
import Utils from "../../../services/utils.js";

const SignUpComponent = {
  async render() {
    // html
    return await Utils.template("./views/pages/sign-up/view.html");
  },

  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  async after_render() {},
};

export default SignUpComponent;
