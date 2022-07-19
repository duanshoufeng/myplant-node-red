import axios from "axios";
import nprogress from "NProgress";
import i18next from "i18next";
import i18nextHttpBackend from "i18next-http-backend";
import Alpine from "alpinejs";
import { uib, Auth } from "../utils";
import "@fortawesome/fontawesome-free/js/all.js";

export default async function startup() {
  // uibuilder
  uib();

  // axios defaults
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.baseURL = "https://172.20.96.36";

  // nprogress defaults
  nprogress.configure({ showSpinner: false });

  // translation defaults
  window.i18next = i18next;
  let language = navigator.language.split("-")[0];
  if (language !== "zh" && language !== "en") language = "en";
  await i18next.use(i18nextHttpBackend).init({
    lng: language,
    debug: false,
    initImmediate: false,
    backend: {
      loadPath: `./languages/${language}.json`,
      allowMultiLoading: false,
    },
  });

  // alpinejs global state
  window.Alpine = Alpine;
  const user = (await Auth.getLoginUser()) ?? { PersonId: 0, Username: "", Roles: [] };
  Alpine.store("loginUser", user);
  Alpine.start();
}
