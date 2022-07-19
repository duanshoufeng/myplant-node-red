import { Mmenu, chinese } from "../../utils/mmenu";

export function startMmenu() {
  Mmenu.i18n(chinese, "zh");
  try {
    new Mmenu(
      "#menu",
      {
        navbar: {
          title: "诺玛科◌重庆",
        },
        counters: {
          add: true,
        },
        iconPanels: {
          add: true,
          visible: "first",
        },
        navbars: [
          {
            position: "top",
            content: ["<img src='./images/brand.svg' class='colorize-orange w-4/5' alt='nemak' />"],
          },
          {
            position: "top",
            content: ["searchfield"],
          },
          {
            position: "top",
            content: ["prev", "title"],
          },
        ],
        searchfield: {
          placeholder: "开始搜索...",
        },
        setSelected: {
          hover: true,
          parent: true,
        },
        offCanvas: {
          page: {
            selector: "#page",
          },
          position: "left-front",
        },
        theme: "light",
      },
      {
        language: "zh",
        offCanvas: {
          clone: true,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}
