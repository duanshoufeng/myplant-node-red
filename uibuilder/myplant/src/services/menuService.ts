import type { MenuItem } from "../models/menuItem";

export const menuList: MenuItem[] = [
  {
    id: "rootParent", // the first ul element
    type: "group",
  },
  {
    id: "dashboards",
    title: "tk_dashboards",
    subtitle: "",
    type: "group",
    icon: "<i class='fa-solid fa-gauge'></i>",
    children: [
      {
        id: "dashboards.gross-production",
        title: "tk_gross_production",
        type: "basic",
        link: "#/dashboards/gross-production",
      },
      {
        id: "dashboards.heating",
        title: "tk_heating",
        type: "basic",
        link: "#/dashboards/heating",
      },
    ],
  },
  {
    id: "applications",
    title: "tk_applications",
    subtitle: "",
    type: "group",
    icon: "<i class='fa-brands fa-app-store-ios'></i>",
    children: [
      {
        id: "applications.melting",
        title: "tk_melting",
        type: "basic",
        link: "#/dashboards/melting",
      },
      {
        id: "applications.heating",
        title: "tk_heating",
        type: "basic",
        link: "#/dashboards/heating",
      },
    ],
  },
];
