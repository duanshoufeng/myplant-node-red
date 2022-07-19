// recursive function to create multilevel menu list,
import type { MenuType } from "../models/menuItem";

export function multilevelMenu(
  parentId: string,
  ctgLists: { [key: string]: string[] },
  ctgData: { [key: string]: MenuType }
) {
  var html = ""; // stores and returns the html code with Menu lists

  // if parent item with child IDs in ctgLists
  if (ctgLists[parentId]) {
    html = "<ul>"; // open UL

    // traverses the array with child IDs of current parent, and adds them in LI tags, with their data from ctgData

    for (const childId of ctgLists[parentId]!) {
      // define CSS class in anchors, useful to be used in CSS style to design the menu
      let index = ctgLists[parentId]!.indexOf(childId);

      // open LI
      if (ctgData[ctgLists[parentId]![index]!]!.type === "basic") {
        html += `<li><a href=${ctgData[ctgLists[parentId]![index]!]!.link} title=${i18next.t(
          ctgData[ctgLists[parentId]![index]!]!.title
        )} >${i18next.t(ctgData[ctgLists[parentId]![index]!]!.icon)}${i18next.t(
          ctgData[ctgLists[parentId]![index]!]!.title
        )}</a>`;
      } else {
        html += `<li><span><span class='icon'>${i18next.t(
          ctgData[ctgLists[parentId]![index]!]!.icon
        )}</span>${i18next.t(ctgData[ctgLists[parentId]![index]!]!.title)}</span>`;
      }

      html += multilevelMenu(ctgLists[parentId]![index]!, ctgLists, ctgData); // re-calls the function to find parent with child-items recursively

      html += "</li>"; // close LI
    }

    html += "</ul>"; // close UL
  }

  return html;
}
