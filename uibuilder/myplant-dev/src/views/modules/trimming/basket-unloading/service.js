import Utils from "../../../../services/utils.js";
import http from "../../../../services/http.js";
import Auth from "../../../../services/auth.js";
import { dmcDataGridOptions } from "./config.js";

const onBasketNumberValid = (self) => {
  const isEmpty = validator.isEmpty(self.basketNumber, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_basket_number_is_required");
  if (self.basketNumber.split("-").length !== 3) return i18next.t("tk_basket_number_format_error");
  const isInt = validator.isInt(self.basketNumber.split("-")[2], { min: 1, max: 500 });
  if (!isInt) return i18next.t("tk_basket_number_format_error");
  return null;
};

window.TrimmingBasketUnloadingService = () => {
  return {
    basketNumber: "",
    onInit() {},
    async onSubmit() {
      try {
        if (this.isBasketNumberValid()) return;
        let basket = parseInt(this.basketNumber.split("-")[2]);
        const response = await http.get("/api/trimming/parts-in-basket", { params: { basket } });

        // update ag-grid
        dmcDataGridOptions.api.setRowData(response.data);

        const user = await Auth.getCurrentUser();

        const data = response.data.map((x) => ({ dmc: x.dmc, personId: user.PersonId }));

        await http.post("/api/trimming/parts-uploading", data);

        this.basketNumber = "";
        Utils.info(i18next.t("tk_save_complete"));
      } catch (error) {
        Utils.log(error);
      }
    },
    isBasketNumberValid() {
      return onBasketNumberValid(this);
    },
  };
};
