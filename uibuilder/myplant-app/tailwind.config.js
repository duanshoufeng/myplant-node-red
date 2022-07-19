module.exports = {
  content: ["./src/**/*.{html,css,js}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        scroll: "scroll 5s linear infinite",
      },
      keyframes: {
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: " translateX(-30%)" },
        },
      },
      width: {
        128: "32rem",
      },
      height: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
