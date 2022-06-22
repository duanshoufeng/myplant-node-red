import { basketOptions } from "./config";
import Utils from "../../../../services/utils.js";
import http from "../../../../services/http.js";
import Auth from "../../../../services/auth.js";

const onBasketWeightValid = (self) => {
  const isEmpty = validator.isEmpty(self.basketWeight, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_basket_weight_is_required");
  const isInt = validator.isInt(self.basketWeight, { min: 10, max: 500 });
  if (!isInt) return "料框重量错误";
  return null;
};
const onBasketNumberValid = (self) => {
  const isEmpty = validator.isEmpty(self.basketNumber, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_basket_number_is_required");
  if (self.basketNumber.split("-").length !== 3) return "框号格式错误";
  const isInt = validator.isInt(self.basketNumber.split("-")[2], { min: 6011, max: 6040 });
  if (!isInt) return "框号格式错误";
  return null;
};

window.ReturnsBasketService = () => {
  return {
    isEditModalOpen: false,
    isModalOpen: false,
    basketWeight: "",
    basketNumber: "",
    async onInit() {
      try {
        const response = await http.get("/api/melting/all-basket");
        // update ag-grid
        basketOptions.api.setRowData(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    onClose() {
      this.isModalOpen = false;
      this.isEditModalOpen = false;
      this.basketNumber = "";
      this.basketWeight = "";
    },
    async onBasketEdit(data) {
      try {
        this.isEditModalOpen = true;
        const response = await http.get("/api/melting/basket-weight", { params: { id: parseInt(data) } });
        this.basketNumber = response.data[0].Number;
        this.basketWeight = response.data[0].Weight.toString();
      } catch (error) {
        console.error(error);
      }
    },
    async onBasketDelete(data) {
      try {
        this.basketNumber = "";
        this.basketWeight = "";
        await http.post("/api/melting/delete-basket", { id: parseInt(data) });

        const response = await http.get("/api/melting/all-basket");
        // update ag-grid
        basketOptions.api.setRowData(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async onUpdateSubmit() {
      try {
        await http.post("/api/melting/update-basket", {
          basket: this.basketNumber,
          weight: parseInt(this.basketWeight),
        });

        const response = await http.get("/api/melting/all-basket");
        // update ag-grid
        basketOptions.api.setRowData(response.data);

        Utils.info(i18next.t("tk_save_complete"));
        this.isEditModalOpen = false;
        this.basketNumber = "";
        this.basketWeight = "";
      } catch (error) {
        console.error(error);
      }
    },
    async onSubmit() {
      try {
        await http.post("/api/melting/new-basket", {
          basket: this.basketNumber.toUpperCase(),
          weight: parseInt(this.basketWeight),
        });
        const response = await http.get("/api/melting/all-basket");
        // update ag-grid
        basketOptions.api.setRowData(response.data);
        this.isModalOpen = false;
        Utils.info(i18next.t("tk_save_complete"));
      } catch (error) {
        Utils.log(error);
      }
    },
    isBasketWeightValid() {
      return onBasketWeightValid(this);
    },
    isBasketNumberValid() {
      return onBasketNumberValid(this);
    },
  };
};
