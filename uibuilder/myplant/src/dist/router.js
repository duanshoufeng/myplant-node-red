"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const routes_1 = __importDefault(require("./utils/routes"));
const utils_2 = require("./utils");
async function router() {
    const content = document.getElementById("content");
    let parsedURL = (0, utils_1.parseRequestURL)().url;
    let routes = (0, routes_1.default)();
    let page = routes[parsedURL] ? routes[parsedURL] : routes["/not-found"];
    const user = await utils_2.Auth.getLoginUser();
    if (!user && page.Roles.length === 0) {
        content.innerHTML = await page.Component.render();
        await page.Component.after_render();
        return;
    }
    else if (!user && page.Roles.length > 0) {
        return window.location.replace("#/sign-in");
    }
    if (page.Roles.length === 0) {
        content.innerHTML = await page.Component.render();
        await page.Component.after_render();
        return;
    }
    let hasAuth = user.Roles.some((item) => page.Roles.includes(item));
    if (hasAuth) {
        content.innerHTML = await page.Component.render();
        await page.Component.after_render();
    }
    else {
        page = routes["/not-authorized"];
        content.innerHTML = await page.Component.render();
        await page.Component.after_render();
    }
}
exports.default = router;
//# sourceMappingURL=router.js.map