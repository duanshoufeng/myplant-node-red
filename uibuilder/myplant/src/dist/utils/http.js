"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const http = {
    get: axios_1.default.get,
    post: axios_1.default.post,
    put: axios_1.default.put,
    delete: axios_1.default.delete,
    request: axios_1.default.request,
};
exports.default = http;
//# sourceMappingURL=http.js.map