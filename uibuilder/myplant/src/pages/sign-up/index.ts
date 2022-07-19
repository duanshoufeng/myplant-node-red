import "./data";
import { xhr } from "../../utils";

export default function SignUpComponent() {
  return {
    async render() {
      // html
      return await xhr("./pages/sign-up/view.html");
    },

    async after_render() {
      try {
      } catch (error) {
        console.error(error);
      }
    },
  };
}
