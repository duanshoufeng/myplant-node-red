import Start from "./start";
import Sidebar from "./views/components/sidebar/controller";
import Navbar from "./views/components/navbar/controller";
import Router from "./router";
import Uib from "./services/uib";

window.addEventListener("resize", () => {
  document.body.style.height = window.innerHeight + "px";
});

// Listen on page load:
window.addEventListener(
  "load",
  async () => {
    // init setup
    await Start();
    // Render Sidebar
    const sidebar = document.getElementById("sidebar_container");
    sidebar.innerHTML = await Sidebar.render();
    await Sidebar.after_render();

    // Render Header
    const header = document.getElementById("header_container");
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();

    // Render Content
    await Router();

    // uibuilder
    Uib();
  },
  false
);

// Listen on hash change:
window.addEventListener(
  "hashchange",
  async () => {
    NProgress.start();
    await Router();
    NProgress.done();
  },
  false
);
