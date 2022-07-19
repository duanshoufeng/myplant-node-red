"use strict";
window._navbar = () => {
    return {
        isFullscreen: false,
        async signOut() {
            localStorage.removeItem("my_token");
            Alpine.store("loginUser").PersonId = 0;
            Alpine.store("loginUser").Username = "";
            Alpine.store("loginUser").Roles = [];
            localStorage.setItem("prevUrl", location.hash);
            window.location.replace("#/sign-in");
        },
        onInit() { },
        onFullscreen() {
            this.isFullscreen = !this.isFullscreen;
            if (this.isFullscreen) {
                document.documentElement.requestFullscreen();
            }
            else {
                document.exitFullscreen();
            }
        },
    };
};
//# sourceMappingURL=data.js.map