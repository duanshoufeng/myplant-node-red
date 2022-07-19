"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./data");
const utils_1 = require("../../utils");
function NavbarComponent() {
    return {
        async render() {
            return await (0, utils_1.template)("./components/navbar/view.html");
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
exports.default = NavbarComponent;
//# sourceMappingURL=index.js.map