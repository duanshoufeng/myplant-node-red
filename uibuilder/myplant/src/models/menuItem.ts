export interface MenuItem {
  id: string;
  title?: string;
  subtitle?: string;
  type: "basic" | "group" | "collapsable";
  icon?: string;
  link?: string;
  children?: MenuItem[];
}

export interface MenuType {
  id: string;
  title: string;
  type: "group" | "collapsable" | "basic";
  icon: string;
  link: string;
}
