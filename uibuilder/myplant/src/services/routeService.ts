import HomeComponent from "../pages/home";
import SignInComponent from "../pages/sign-in";
import SignUpComponent from "../pages/sign-up";
import GrossProductionComponent from "../dashboards/gross-production";
import type { Route } from "../models/route";

export const routes: Route = {
  "/": { Component: HomeComponent(), Roles: [] },
  "/sign-in": { Component: SignInComponent(), Roles: [] },
  "/sign-up": { Component: SignUpComponent(), Roles: [] },
  "/dashboards/gross-production": { Component: GrossProductionComponent(), Roles: [] },
};
