import Utils from "../../../services/utils.js";
import http from "../../../services/http.js";
import Auth from "../../../services/auth.js";

function startTimer(duration) {
  let seconds = duration;
  let interval = setInterval(function () {
    console.log(seconds + "s");

    if (--seconds < 0) {
      clearInterval(interval);
    }
  }, 1000);
}

window.SignUpService = () => {
  return {
    personId: "",
    verifyCode: "",
    randomCode: "",
    password: "",
    passwordRepeat: "",
    isPersonIdValid() {
      const isEmpty = validator.isEmpty(this.personId, { ignore_whitespace: true });
      if (isEmpty) return i18next.t("tk_personId_is_required");
      return null;
    },
    isVerifyCodeValid() {
      const isEmpty = validator.isEmpty(this.verifyCode, { ignore_whitespace: true });
      if (isEmpty) return i18next.t("tk_verifyCode_is_required");
      return null;
    },
    isPasswordValid() {
      const isEmpty = validator.isEmpty(this.password);
      if (isEmpty) return i18next.t("tk_password_is_required");
      const isLength = validator.isLength(this.password, { min: 5, max: undefined });
      if (!isLength) return i18next.t("tk_password_length_not_less_than_5");
      return null;
    },
    isPasswordRepeatValid() {
      const equals = validator.equals(this.password, this.passwordRepeat);
      if (!equals) return i18next.t("tk_password_not_match");
      return null;
    },
    onInit() {
      if (this.$store.currentUser.profile.PersonId !== null) {
        window.location.replace("#/");
      }
    },
    async getVerifyCode() {
      try {
        this.$refs.verifyCode.disabled = true;
        this.$refs.verifyCode.classList.toggle("opacity-50");
        this.$refs.verifyCode.classList.toggle("cursor-not-allowed");
        let seconds = 10;
        let interval = setInterval(() => {
          if (this.$refs.verifyCode) {
            this.$refs.verifyCode.textContent = seconds + "s";

            if (--seconds < 0) {
              this.$refs.verifyCode.textContent = i18next.t("tk_get_verify_code");
              this.$refs.verifyCode.disabled = false;
              this.$refs.verifyCode.classList.toggle("opacity-50");
              this.$refs.verifyCode.classList.toggle("cursor-not-allowed");
              clearInterval(interval);
            }
          }
        }, 1000);

        const personId = parseInt(this.personId);
        this.randomCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
        let response = await http.post(`/api/auth/message`, {
          PersonId: personId,
          Code: this.randomCode,
        });
        if (response.data.errcode !== 0) {
          Utils.info(i18next.t("tk_invalid_personId"));
          return;
        }
      } catch (error) {
        console.error("Veriy Code Error", error);
      }
    },
    async onSubmit() {
      if (this.verifyCode && parseInt(this.verifyCode) !== this.randomCode) {
        Utils.info(i18next.t("tk_verifyCode_invalid"));
        return;
      }
      try {
        let response = await http.post(`/api/auth/sign-up`, {
          PersonId: this.personId.trim(),
          Password: this.password,
        });

        const token = response.data;
        localStorage.setItem("my_token", JSON.stringify(token));
        await Alpine.store("currentUser").init();
        Auth.refreshToken();

        window.location.replace("#/");
        // reset the previous url state
        window.history.pushState({ prevUrl: false }, "");
      } catch (err) {
        Utils.info(i18next.t("tk_personId_exist"));
        console.error("Error register", err);
      }
    },
  };
};
