"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const utils_1 = require("../../utils");
window._signIn = () => {
    return {
        personId: "",
        password: "",
        cardId: "",
        readerLinked: false,
        isPersonIdValid() {
            const isEmpty = validator_1.default.isEmpty(this.personId, { ignore_whitespace: true });
            if (isEmpty)
                return i18next.t("tk_personId_is_required");
            return null;
        },
        isPasswordValid() {
            const isEmpty = validator_1.default.isEmpty(this.password);
            if (isEmpty)
                return i18next.t("tk_password_is_required");
            return null;
        },
        onInit() {
            if (Alpine.store("loginUser").PersonId > 0) {
                window.location.replace("#/");
            }
        },
        async signInCard(data) {
            try {
                let response = await utils_1.http.post(`/api/auth/sign-in-card`, {
                    CardId: data,
                });
                const token = response.data;
                localStorage.setItem("my_token", JSON.stringify(token));
                await Alpine.store("currentUser").init();
                utils_1.Auth.refreshToken();
                if (localStorage.getItem("prevUrl")) {
                    window.location.replace(localStorage.getItem("prevUrl") ?? "");
                }
                else {
                    window.location.replace("#/");
                }
                localStorage.setItem("prevUrl", "");
            }
            catch (err) {
                (0, utils_1.toastify)(i18next.t("tk_sign_in_failed"));
                console.error("Error login", err);
            }
        },
        async onSubmit() {
            try {
                let response = await utils_1.http.post(`/api/auth/sign-in`, {
                    PersonId: this.personId.trim(),
                    Password: this.password,
                });
                const token = response.data;
                localStorage.setItem("my_token", JSON.stringify(token));
                const user = (await utils_1.Auth.getLoginUser()) ?? { PersonId: 0, Username: "", Roles: [] };
                Alpine.store("loginUser", user);
                utils_1.Auth.refreshToken();
                if (localStorage.getItem("prevUrl")) {
                    window.location.replace(localStorage.getItem("prevUrl") ?? "");
                }
                else {
                    window.location.replace("#/");
                }
            }
            catch (err) {
                (0, utils_1.toastify)(i18next.t("tk_sign_in_failed"));
                console.error("Error login", err);
            }
        },
    };
};
//# sourceMappingURL=data.js.map