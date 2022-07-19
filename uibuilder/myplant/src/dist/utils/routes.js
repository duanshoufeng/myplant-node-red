"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = __importDefault(require("../pages/home"));
const sign_in_1 = __importDefault(require("../pages/sign-in"));
const sign_up_1 = __importDefault(require("../pages/sign-up"));
function getRoutes() {
    return {
        "/": { Component: (0, home_1.default)(), Roles: [] },
        "/sign-in": { Component: (0, sign_in_1.default)(), Roles: [] },
        "/sign-up": { Component: (0, sign_up_1.default)(), Roles: [] },
    };
}
exports.default = getRoutes;
//# sourceMappingURL=routes.js.map