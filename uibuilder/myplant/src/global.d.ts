import i18nextType from "i18next";
import AlpineType from "alpinejs";

declare global {
  var Alpine: AlpineType;
  var i18next: i18nextType;
  var _navbar: () => any;
  var _sidebar: () => any;
  var _signIn: () => any;
  var _signUp: () => any;
  var _home: () => any;
  var _dashboards_gross_production: () => any;
}
