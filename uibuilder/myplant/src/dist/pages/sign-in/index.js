"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./data");
const utils_1 = require("../../utils");
function SignInComponent() {
    return {
        async render() {
            return await (0, utils_1.template)("./pages/sign-in/view.html");
        },
        async after_render() {
            try {
            }
            catch (error) {
                console.error(error);
            }
        },
    };
}
exports.default = SignInComponent;
//# sourceMappingURL=index.js.map