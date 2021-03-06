import Utils from "./services/utils";
import Auth from "./services/auth";

import HomeComponent from "./views/pages/home/controller";
import SignInComponent from "./views/pages/sign-in/controller";
import ForgotPasswordComponent from "./views/pages/forgot-password/controller";
import SignUpComponent from "./views/pages/sign-up/controller";
import AluminumTrackingComponent from "./views/modules/melting/aluminum-tracking/controller";
import ReturnsWeighingComponent from "./views/modules/melting/returns-weighing/controller";
import MeltingChargeDashboardComponent from "./views/pages/dashboards/melting-charge/controller";
import HeatTreatmentTemperatureCurveComponent from "./views/pages/dashboards/heat-treatment-temperature-curve/controller";
import PreHeatingStorageComponent from "./views/pages/dashboards/pre-heating-storage/controller";
import TrimmingBasketUnloadingComponent from "./views/modules/trimming/basket-unloading/controller";
import PreHeatingTimeComponent from "./views/modules/heating/pre-heating-time/controller";
import HeatingBasketUploadingComponent from "./views/modules/heating/basket-uploading/controller";
import HeatingManualBooking from "./views/modules/heating/manual-booking/controller";
import Error404 from "./views/pages/error/error-404/error-404";
import NotAuthorized from "./views/pages/error/not-authorized/not-authorized";
import MaterialFeedingComponent from "./views/modules/melting/material-feeding/controller";
import ChargeHistoryComponent from "./views/modules/melting/charge-history/controller";
import ReturnsBasketComponent from "./views/modules/master/melting-returns-basket/controller";
import VacuumManagerComponent from "./views/modules/melting/vacumm-manager/controller";
import FinishedSetSearchComponent from "./views/modules/tracking/set-finished/controller";
import LadleStateComponent from "./views/pages/dashboards/ladle-state/controller";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  "/": { Component: HomeComponent, Roles: ["user"] },
  "/sign-in": { Component: SignInComponent, Roles: [] },
  "/forgot-password": { Component: ForgotPasswordComponent, Roles: [] },
  "/sign-up": { Component: SignUpComponent, Roles: [] },

  "/master/melting/returns-basket": { Component: ReturnsBasketComponent, Roles: [] }, // Master menu start

  "/tracking/set-finished/search": { Component: FinishedSetSearchComponent, Roles: [] }, // tracking system

  "/melting/aluminum-tracking": { Component: AluminumTrackingComponent, Roles: ["user"] }, // melting
  "/melting/material-feeding": { Component: MaterialFeedingComponent, Roles: ["user"] },
  "/melting/charge-history": { Component: ChargeHistoryComponent, Roles: ["user"] },
  "/melting/returns-weighing": { Component: ReturnsWeighingComponent, Roles: ["user"] },
  "/melting/vacumm-manager": { Component: VacuumManagerComponent, Roles: ["melting"] },

  "/trimming/basket-unloading": { Component: TrimmingBasketUnloadingComponent, Roles: ["trimming"] }, // trimming

  "/dashboards/melting-charge": {
    Component: MeltingChargeDashboardComponent,
    Roles: [],
  }, // dashboard
  "/dashboards/heat-treatment-temperature-curve": {
    Component: HeatTreatmentTemperatureCurveComponent,
    Roles: [],
  },
  "/dashboards/pre-heating-storage": {
    Component: PreHeatingStorageComponent,
    Roles: [],
  },
  "/dashboards/ladle-state": {
    Component: LadleStateComponent,
    Roles: [],
  },

  "/heating/pre-heating-time": {
    Component: PreHeatingTimeComponent,
    Roles: ["heating"],
  }, // heating
  "/heating/basket-uploading": {
    Component: HeatingBasketUploadingComponent,
    Roles: [],
  },
  "/heating/manual-booking": {
    Component: HeatingManualBooking,
    Roles: ["heating"],
  },
  "/not-found": { Component: Error404, Roles: [] },
  "/not-authorized": { Component: NotAuthorized, Roles: [] },
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const Router = async () => {
  clearTimeout(parseInt(localStorage.getItem("timeId")));
  // Lazy load view element:
  const content = null || document.getElementById("content_container");

  // Get the parsed URl from the addressbar
  let parsedURL = Utils.parseRequestURL().url;

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : routes["/not-found"];

  const user = await Auth.getCurrentUser();

  // user not signed in
  if (!user && page.Roles.length === 0) {
    content.innerHTML = await page.Component.render();
    await page.Component.after_render();
    return;
  } else if (!user && page.Roles.length > 0) {
    return window.location.replace("#/sign-in");
  }

  // user signed in
  if (page.Roles.length === 0) {
    content.innerHTML = await page.Component.render();
    await page.Component.after_render();
    return;
  }

  // authorization
  let hasAuth = user.Roles.some((item) => page.Roles.includes(item));
  if (hasAuth) {
    content.innerHTML = await page.Component.render();
    await page.Component.after_render();
  } else {
    page = routes["/not-authorized"];
    content.innerHTML = await page.Component.render();
    await page.Component.after_render();
  }
};

export default Router;
