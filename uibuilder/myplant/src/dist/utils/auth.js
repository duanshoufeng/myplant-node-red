"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("./http"));
const axios_1 = __importDefault(require("axios"));
class Auth {
    static async getLoginUser() {
        try {
            const token = localStorage.getItem("my_token");
            if (token === null)
                return null;
            const response = await http_1.default.post(`/api/auth/me`, JSON.parse(token));
            return response.data;
        }
        catch (ex) {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
            }
            else if (ex.request) {
                console.log(ex.request);
            }
            else {
                console.log("Error", ex.message);
            }
            return null;
        }
    }
    static refreshToken() {
        let token = JSON.parse(localStorage.getItem("my_token") ?? "");
        if (token) {
            token = token.Token;
        }
        else
            token = null;
        axios_1.default.defaults.headers.common["Authorization"] = token;
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map