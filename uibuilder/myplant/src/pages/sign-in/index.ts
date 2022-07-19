import "./data";
import { xhr } from "../../utils";

export default function SignInComponent() {
  return {
    async render() {
      // html
      return await xhr("./pages/sign-in/view.html");
    },

    async after_render() {
      try {
      } catch (error) {
        console.error(error);
      }
    },
  };
}
