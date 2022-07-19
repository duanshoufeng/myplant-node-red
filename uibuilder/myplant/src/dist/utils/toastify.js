"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toastify_js_1 = __importDefault(require("toastify-js"));
function toastify(info) {
    (0, toastify_js_1.default)({
        text: `${info}`,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { },
    }).showToast();
}
exports.default = toastify;
//# sourceMappingURL=toastify.js.map