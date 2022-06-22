import Utils from "../../../../services/utils.js";
import http from "../../../../services/http.js";
import Auth from "../../../../services/auth.js";

const onBookingQuantityValid = (self) => {
  const isInt = validator.isInt(self.bookingQuantity, { min: 1, max: 500 });
  if (!isInt) return i18next.t("tk_booking_quantity_range_1_500");
  return null;
};
const onPartNumberValid = (self) => {
  const isEmpty = validator.isEmpty(self.selectedPartNumber.value, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_part_number_is_required");
  return null;
};
const onToolNumberValid = (self) => {
  const isEmpty = validator.isEmpty(self.selectedToolNumber.value, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_tool_number_is_required");
  return null;
};

window.HeatingManualBookingService = () => {
  return {
    bookingQuantity: "",
    selectedPartNumber: { value: "" },
    partNumberChoices: [],
    selectedToolNumber: { value: "" },
    toolNumberChoices: [],

    async partNumberChoicesInit() {
      this.partNumberChoices = new Choices(this.$refs.partNumberSelector, {
        shouldSort: false,
        position: "bottom",
        choices: [{ id: 0, value: "", label: "请选择产品", disabled: true, selected: true }],
        classNames: {
          containerOuter: "choices mb-1",
          containerInner: "choices__inner",
        },
      });

      const response = await http.get("/api/heating/product-choices");
      let choices = response.data.map((x) => ({ id: parseInt(x.Id), value: x.Value, label: x.Label }));
      this.partNumberChoices.setChoices(choices, "value", "label", false);
    },

    async toolNumberUpdate(partNumber) {
      this.toolNumberChoices.clearChoices();
      this.toolNumberChoices.setChoices(
        [{ id: 0, value: "", label: "请选择模具", disabled: true, selected: true }],
        "value",
        "label",
        false
      );
      const response = await http.get("/api/heating/tool-choices", {
        params: { partNumber },
      });

      let choices = response.data.map((x) => ({ id: parseInt(x.Id), value: x.Value.toString(), label: x.Label }));
      this.toolNumberChoices.setChoices(choices, "value", "label", false);
    },

    async toolNumberChoicesInit() {
      this.toolNumberChoices = new Choices(this.$refs.toolNumberSelector, {
        shouldSort: false,
        position: "bottom",
        choices: [{ id: 0, value: "", label: "请选择模具", disabled: true, selected: true }],
        classNames: {
          containerOuter: "choices mb-1",
          containerInner: "choices__inner",
        },
      });
    },

    isBookingQuantityValid() {
      return onBookingQuantityValid(this);
    },
    isPartNumberValid() {
      return onPartNumberValid(this);
    },
    isToolNumberValid() {
      return onToolNumberValid(this);
    },

    async onInit() {},
    onReset() {
      // clear history data
      this.partNumberChoices.setChoiceByValue("");
      this.selectedPartNumber.value = "";
      this.toolNumberChoices.setChoiceByValue("");
      this.selectedToolNumber.value = "";
      this.bookingQuantity = "";
    },
    async onSubmit() {
      document.getElementById("saveBooking").disabled = true;
      NProgress.start();
      try {
        const user = await Auth.getCurrentUser();

        await http.post("/api/heating/manual-booking", {
          partNumber: this.selectedPartNumber.value,
          toolNumber: parseInt(this.selectedToolNumber.value),
          bookingQuantity: parseInt(this.bookingQuantity),
          personId: parseInt(user.PersonId),
        });

        this.onReset();
        Utils.info(i18next.t("tk_save_complete"));
        document.getElementById("saveBooking").disabled = false;
        NProgress.done();
      } catch (error) {
        this.onReset();
        document.getElementById("saveBooking").disabled = false;
        NProgress.done();
        Utils.info(i18next.t("tk_save_error"));
        Utils.log(error);
      }
    },
  };
};
