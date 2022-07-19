import NProgress from "NProgress";
import statup from "./startup";
import router from "./router";
import SidebarComponent from "./components/sidebar";
import NavbarComponent from "./components/navbar";

window.addEventListener("resize", () => {
  document.body.style.height = window.innerHeight + "px";
});

// run this function when the document is loaded
window.addEventListener(
  "load",
  async () => {
    await statup();

    // render sidebar
    const sidebar = document.getElementById("sidebar") as HTMLElement;
    sidebar.innerHTML = await SidebarComponent().render();
    await SidebarComponent().after_render();

    // render navbar
    const navbar = document.getElementById("header") as HTMLElement;
    navbar.innerHTML = await NavbarComponent().render();
    await NavbarComponent().after_render();

    // render content
    await router();
  },
  false
);

// Listen on hash change:
window.addEventListener(
  "hashchange",
  async () => {
    NProgress.start();
    await router();
    NProgress.done();
  },
  false
);
