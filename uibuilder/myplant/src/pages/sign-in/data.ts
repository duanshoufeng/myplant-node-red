import validator from "validator";
import { Auth, http, toastify } from "../../utils";

window._signIn = () => {
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
      if (Alpine.store("loginUser").PersonId > 0) {
        window.location.replace("#/");
      }
    },
    async signInCard(data: string) {
      try {
        let response = await http.post(`/api/auth/sign-in-card`, {
          CardId: data,
        });

        const token = response.data;
        localStorage.setItem("my_token", JSON.stringify(token));
        await Alpine.store("currentUser").init();
        Auth.refreshToken();

        if (localStorage.getItem("prevUrl")) {
          window.location.replace(localStorage.getItem("prevUrl") ?? "");
        } else {
          window.location.replace("#/");
        }
        // reset the previous url state
        localStorage.setItem("prevUrl", "");
      } catch (err) {
        toastify(i18next.t("tk_sign_in_failed"));
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
        const user = (await Auth.getLoginUser()) ?? { PersonId: 0, Username: "", Roles: [] };
        Alpine.store("loginUser", user);
        Auth.refreshToken();

        if (localStorage.getItem("prevUrl")) {
          window.location.replace(localStorage.getItem("prevUrl") ?? "");
        } else {
          window.location.replace("#/");
        }
      } catch (err) {
        toastify(i18next.t("tk_sign_in_failed"));
        console.error("Error login", err);
      }
    },
  };
};
