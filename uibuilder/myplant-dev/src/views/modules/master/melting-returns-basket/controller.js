import "./service.js";
import Utils from "../../../../services/utils.js";
import http from "../../../../services/http.js";
import { basketOptions } from "./config";

const onFilterTextBoxChanged = () => {
  basketOptions.api.setQuickFilter(document.getElementById("filter-text").value);
};

const ReturnsBasketComponent = {
  async render() {
    // html
    return await Utils.template("./views/modules/master/melting-returns-basket/view.html");
  },

  async after_render() {
    try {
      var basket = document.querySelector("#basketManager");
      new agGrid.Grid(basket, basketOptions);
      document.getElementById("filter-text").oninput = onFilterTextBoxChanged;
      basketOptions.api.sizeColumnsToFit();
    } catch (err) {
      console.error(err);
    }
  },
};

export default ReturnsBasketComponent;
