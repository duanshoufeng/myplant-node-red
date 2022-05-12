import Utils from "../../../services/utils.js";
import http from "../../../services/http.js";
import Auth from "../../../services/auth.js";

window.SignInService = () => {
  return {
    personId: "",
    password: "",
    cardId: "",
    readerLinked: false,
    isPersonIdValid() {
      const isEmpty = validator.isEmpty(this.personId, { ignore_whitespace: true });
      if (isEmpty) return i18next.t("tk_personId_is_required");
      return null;
    },
    isPasswordValid() {
      const isEmpty = validator.isEmpty(this.password);
      if (isEmpty) return i18next.t("tk_password_is_required");
      return null;
    },
    onInit() {
      if (this.$store.currentUser.profile.PersonId !== null) {
        window.location.replace("#/");
      }
    },
    async signInCard(data) {
      try {
        let response = await http.post(`/api/auth/sign-in-card`, {
          CardId: data,
        });

        const token = response.data;
        localStorage.setItem("my_token", JSON.stringify(token));
        await Alpine.store("currentUser").init();
        Auth.refreshToken();

        if (localStorage.getItem("prevUrl")) {
          window.location.replace(localStorage.getItem("prevUrl"));
        } else {
          window.location.replace("#/");
        }
        // reset the previous url state
        localStorage.setItem("prevUrl", "");
      } catch (err) {
        Utils.info(i18next.t("tk_sign_in_failed"));
        console.error("Error login", err);
      }
    },
    async onSubmit() {
      try {
        let response = await http.post(`/api/auth/sign-in`, {
          PersonId: this.personId.trim(),
          Password: this.password,
        });

        const token = response.data;
        localStorage.setItem("my_token", JSON.stringify(token));
        await Alpine.store("currentUser").init();
        Auth.refreshToken();

        if (localStorage.getItem("prevUrl")) {
          window.location.replace(localStorage.getItem("prevUrl"));
        } else {
          window.location.replace("#/");
        }
      } catch (err) {
        Utils.info(i18next.t("tk_sign_in_failed"));
        console.error("Error login", err);
      }
    },
  };
};
