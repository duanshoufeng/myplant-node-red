import "./data";
import { xhr } from "../../utils";

export default function NavbarComponent() {
  return {
    async render() {
      // html
      return await xhr("./components/navbar/view.html");
    },

    async after_render() {
      try {
      } catch (error) {
        console.error(error);
      }
    },
  };
}
