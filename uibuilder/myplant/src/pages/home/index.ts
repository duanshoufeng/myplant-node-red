import "./data";
import { xhr } from "../../utils";

export default function HomeComponent() {
  return {
    async render() {
      // html
      return await xhr("./pages/home/view.html");
    },

    async after_render() {
      try {
      } catch (error) {
        console.error(error);
      }
    },
  };
}
