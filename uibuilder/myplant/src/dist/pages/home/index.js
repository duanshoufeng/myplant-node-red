"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function HomeComponent() {
    return {
        async render() {
            return await (0, utils_1.template)("./pages/home/view.html");
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
exports.default = HomeComponent;
//# sourceMappingURL=index.js.map