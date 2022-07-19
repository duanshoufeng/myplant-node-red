"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const NProgress_1 = __importDefault(require("NProgress"));
const i18next_1 = __importDefault(require("i18next"));
const i18next_http_backend_1 = __importDefault(require("i18next-http-backend"));
const alpinejs_1 = __importDefault(require("alpinejs"));
const utils_1 = require("../utils");
async function startup() {
    (0, utils_1.uib)();
    axios_1.default.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios_1.default.defaults.baseURL = "https://172.20.96.36";
    NProgress_1.default.configure({ showSpinner: false });
    window.i18next = i18next_1.default;
    let language = navigator.language.split("-")[0];
    if (language !== "zh" && language !== "en")
        language = "en";
    await i18next_1.default.use(i18next_http_backend_1.default).init({
        lng: language,
        debug: false,
        initImmediate: false,
        backend: {
            loadPath: `./languages/${language}.json`,
            allowMultiLoading: false,
        },
    });
    window.Alpine = alpinejs_1.default;
    const user = (await utils_1.Auth.getLoginUser()) ?? { PersonId: 0, Username: "", Roles: [] };
    alpinejs_1.default.store("loginUser", user);
    alpinejs_1.default.start();
}
exports.default = startup;
//# sourceMappingURL=index.js.map