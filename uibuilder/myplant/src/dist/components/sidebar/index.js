"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function SidebarComponent() {
    return {
        async render() {
            return await (0, utils_1.template)("./components/sidebar/view.html");
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
exports.default = SidebarComponent;
//# sourceMappingURL=index.js.map