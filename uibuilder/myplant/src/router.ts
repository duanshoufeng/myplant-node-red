import { routes } from "./services/routeService";
import { parseURL } from "./utils";
import { Auth } from "./utils";

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
export default async function router() {
  // Lazy load view element:
  const content = document.getElementById("content") as HTMLElement;

  // Get the parsed URl from the addressbar
  let parsedURL: string = parseURL().url;

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : routes["/not-found"];

  const user = await Auth.getLoginUser();

  // user not signed in
  if (!user && page!.Roles.length === 0) {
    content.innerHTML = await page!.Component.render();
    await page!.Component.after_render();
    return;
  } else if (!user && page!.Roles.length > 0) {
    return window.location.replace("#/sign-in");
  }

  // user signed in
  if (page!.Roles.length === 0) {
    content.innerHTML = await page!.Component.render();
    await page!.Component.after_render();
    return;
  }

  // authorization
  let hasAuth = user.Roles.some((item: string) => page!.Roles.includes(item));
  if (hasAuth) {
    content.innerHTML = await page!.Component.render();
    await page!.Component.after_render();
  } else {
    page = routes["/not-authorized"];
    content.innerHTML = await page!.Component.render();
    await page!.Component.after_render();
  }
}
