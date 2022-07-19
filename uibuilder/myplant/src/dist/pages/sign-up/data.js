"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const utils_1 = require("../../utils");
window._signUp = () => {
    return {
        personId: "",
        verifyCode: "",
        randomCode: 0,
        password: "",
        passwordRepeat: "",
        isPersonIdValid() {
            const isEmpty = validator_1.default.isEmpty(this.personId, { ignore_whitespace: true });
            if (isEmpty)
                return i18next.t("tk_personId_is_required");
            return null;
        },
        isVerifyCodeValid() {
            const isEmpty = validator_1.default.isEmpty(this.verifyCode, { ignore_whitespace: true });
            if (isEmpty)
                return i18next.t("tk_verifyCode_is_required");
            return null;
        },
        isPasswordValid() {
            const isEmpty = validator_1.default.isEmpty(this.password);
            if (isEmpty)
                return i18next.t("tk_password_is_required");
            const isLength = validator_1.default.isLength(this.password, { min: 5, max: undefined });
            if (!isLength)
                return i18next.t("tk_password_length_not_less_than_5");
            return null;
        },
        isPasswordRepeatValid() {
            const equals = validator_1.default.equals(this.password, this.passwordRepeat);
            if (!equals)
                return i18next.t("tk_password_not_match");
            return null;
        },
        onInit() {
            if (Alpine.store("loginUser").PersonId > 0) {
                window.location.replace("#/");
            }
        },
        async getVerifyCode() {
            try {
                const button = document.getElementById("verifyCode");
                button.disabled = true;
                button.classList.toggle("opacity-50");
                button.classList.toggle("cursor-not-allowed");
                let seconds = 10;
                let interval = setInterval(() => {
                    if (button) {
                        button.textContent = seconds + "s";
                        if (--seconds < 0) {
                            button.textContent = i18next.t("tk_get_verify_code");
                            button.disabled = false;
                            button.classList.toggle("opacity-50");
                            button.classList.toggle("cursor-not-allowed");
                            clearInterval(interval);
                        }
                    }
                }, 1000);
                const personId = parseInt(this.personId);
                this.randomCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
                let response = await utils_1.http.post(`/api/auth/message`, {
                    PersonId: personId,
                    Code: this.randomCode,
                });
                if (response.data.errcode !== 0) {
                    (0, utils_1.toastify)(i18next.t("tk_invalid_personId"));
                    return;
                }
            }
            catch (error) {
                console.error("Veriy Code Error", error);
            }
        },
        async onSubmit() {
            if (this.verifyCode && parseInt(this.verifyCode) !== this.randomCode) {
                (0, utils_1.toastify)(i18next.t("tk_verifyCode_invalid"));
                return;
            }
            try {
                let response = await utils_1.http.post(`/api/auth/sign-up`, {
                    PersonId: this.personId.trim(),
                    Password: this.password,
                });
                const token = response.data;
                localStorage.setItem("my_token", JSON.stringify(token));
                await Alpine.store("currentUser").init();
                utils_1.Auth.refreshToken();
                window.location.replace("#/");
                window.history.pushState({ prevUrl: false }, "");
            }
            catch (err) {
                (0, utils_1.toastify)(i18next.t("tk_personId_exist"));
                console.error("Error register", err);
            }
        },
    };
};
//# sourceMappingURL=data.js.map