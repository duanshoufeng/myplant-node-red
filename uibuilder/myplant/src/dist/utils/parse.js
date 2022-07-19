"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseRequestURL() {
    const query = location.hash.slice(1).toLowerCase() || "/";
    const url = query.split("?")[0] ?? "";
    const params = new URLSearchParams(query.split("?")[1]);
    return { url, params };
}
exports.default = parseRequestURL;
//# sourceMappingURL=parse.js.map