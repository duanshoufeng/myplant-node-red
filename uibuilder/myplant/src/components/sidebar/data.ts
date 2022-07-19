import type { MenuItem, MenuType } from "../../models/menuItem";
import { menuList } from "../../services/menuService";
import { multilevelMenu } from "../../utils/multilevelMenu";

export function getMenuContent(): string {
  let categoryList: { [key: string]: string[] } = {};
  let menuData: MenuType[] = [];
  let flatMenu = (item: MenuItem): void => {
    menuData.push({
      id: item.id,
      title: item.title ?? "",
      type: item.type,
      icon: item.icon ?? "",
      link: item.link ?? "",
    });
    if (item.children) {
      item.children.forEach((x) => flatMenu(x));
    }
  };

  menuList.forEach((x) => flatMenu(x));

  menuData
    .filter((x) => x.type !== "basic")
    .map((x) => x.id)
    .forEach((c) => {
      if (c) {
        let list: string[] = [];
        menuData
          .map((x) => x.id)
          .forEach((x) => {
            if (x?.startsWith(c) && c !== x) list.push(x);
          });
        categoryList[c] = list;
      }
    });

  let group: string[] = [];
  Object.keys(categoryList).forEach((x) => {
    if (x.split(".").length === 1 && x !== "rootParent") group.push(x);
  });
  categoryList["rootParent"] = group;

  let categoryData: { [key: string]: MenuType } = {};

  menuData.forEach((x) => {
    if (x.id) categoryData[x.id] = x;
  });

  return multilevelMenu("rootParent", categoryList, categoryData);
}
