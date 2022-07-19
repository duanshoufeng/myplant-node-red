"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NProgress_1 = __importDefault(require("NProgress"));
const startup_1 = __importDefault(require("./startup"));
const router_1 = __importDefault(require("./router"));
const sidebar_1 = __importDefault(require("./components/sidebar"));
const navbar_1 = __importDefault(require("./components/navbar"));
let a = 1;
let b = 2;
console.log(a);
console.log(b);
window.addEventListener("load", async () => {
    await (0, startup_1.default)();
    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = await (0, sidebar_1.default)().render();
    await (0, sidebar_1.default)().after_render();
    const navbar = document.getElementById("navbar");
    navbar.innerHTML = await (0, navbar_1.default)().render();
    await (0, navbar_1.default)().after_render();
    await (0, router_1.default)();
}, false);
window.addEventListener("hashchange", async () => {
    NProgress_1.default.start();
    await (0, router_1.default)();
    NProgress_1.default.done();
}, false);
//# sourceMappingURL=main.js.map