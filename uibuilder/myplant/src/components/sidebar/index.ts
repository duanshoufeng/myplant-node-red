import { xhr } from "../../utils";
import { startMmenu } from "./config";
import { getMenuContent } from "./data";

export default function SidebarComponent() {
  return {
    async render() {
      // html
      return await xhr("./components/sidebar/view.html");
    },

    async after_render() {
      let menu = document.getElementById("menu") as HTMLElement;
      menu.innerHTML = `${getMenuContent()}`;
      startMmenu();
    },
  };
}
