import Auth from "./services/auth.js";
import Config from "./services/config.js";

const Start = async () => {
  try {
    // axios defaults
    axios.defaults.baseURL = Config.baseUrl;
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    Auth.refreshToken();

    // progress bar
    NProgress.configure({ showSpinner: false });

    // fallback to english
    let language = navigator.language.split("-")[0];
    if (language !== "zh" && language !== "en") language = "en";

    // i18n
    await i18next.use(i18nextHttpBackend).init({
      lng: language,
      debug: false,
      initImmediate: false,
      backend: {
        loadPath: `./languages/${language}.json`,
        allowMultiLoading: false,
      },
    });
    //declare global state
    Alpine.store("currentUser", {
      profile: {},
      async init() {
        try {
          const me = await Auth.getCurrentUser();
          if (me === null) {
            this.profile.PersonId = null;
            this.profile.Username = null;
            this.profile.Roles = null;
          } else this.profile = me;
        } catch (error) {
          console.error("auth error", error);
        }
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default Start;
