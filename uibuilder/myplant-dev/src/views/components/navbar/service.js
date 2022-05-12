import Utils from "../../../services/utils.js";

window.NavbarService = () => {
  return {
    isFullscreen: true,
    async signOut() {
      localStorage.removeItem("my_token");
      await Alpine.store("currentUser").init();

      localStorage.setItem("prevUrl", location.hash);
      window.location.replace("#/sign-in");
    },
    onInit() {},
    onFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      if (this.isFullscreen) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
  };
};
