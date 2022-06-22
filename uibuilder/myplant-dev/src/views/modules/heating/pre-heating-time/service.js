import Utils from "../../../../services/utils";
import http from "../../../../services/http";
import Auth from "../../../../services/auth";

const onBasketNumberCheckInValid = (self) => {
  const isEmpty = validator.isEmpty(self.basketNumberCheckIn, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_basket_number_is_required");
  const isFormat = self.basketNumberCheckIn.toUpperCase().startsWith("NCHQ-PTB-");
  if (!isFormat) return i18next.t("tk_basket_number_format_error");
  const isInt = validator.isInt(self.basketNumberCheckIn.split("-")[2]);
  if (!isInt) return i18next.t("tk_basket_number_format_error");
  return null;
};
const onBasketNumberCheckOutValid = (self) => {
  const isEmpty = validator.isEmpty(self.basketNumberCheckOut, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_basket_number_is_required");
  const isFormat = self.basketNumberCheckOut.toUpperCase().startsWith("NCHQ-PTB-");
  if (!isFormat) return i18next.t("tk_basket_number_format_error");
  const isInt = validator.isInt(self.basketNumberCheckOut.split("-")[2]);
  if (!isInt) return i18next.t("tk_basket_number_format_error");
  return null;
};
const onRoomStringCheckInValid = (self) => {
  const isEmpty = validator.isEmpty(self.roomStringCheckIn, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_storage_room_is_required");
  const isFormat = self.roomStringCheckIn.toUpperCase().startsWith("NCHQ-PHT-");
  if (!isFormat) return i18next.t("tk_room_number_format_error");
  const isInt = validator.isInt(self.roomStringCheckIn.split("-")[2]);
  if (!isInt) return i18next.t("tk_room_number_format_error");
  return null;
};

window.PreHeatingTimeService = () => {
  return {
    basketNumberCheckIn: "",
    basketNumberCheckOut: "",
    roomStringCheckIn: "",

    isBasketNumberCheckInValid() {
      return onBasketNumberCheckInValid(this);
    },
    isBasketNumberCheckOutValid() {
      return onBasketNumberCheckOutValid(this);
    },
    isRoomStringCheckInValid() {
      return onRoomStringCheckInValid(this);
    },

    onInit() {},
    async onSubmitCheckIn() {
      document.getElementById("checkInSave").disabled = true;
      NProgress.start();
      try {
        let basketNumber = parseInt(this.basketNumberCheckIn.split("-")[2]);

        const user = await Auth.getCurrentUser();

        await http.post("/api/heating/pre-check-in", {
          basketString: this.basketNumberCheckIn.toUpperCase(),
          basketNumber,
          roomString: this.roomStringCheckIn.toUpperCase(),
          personId: user.PersonId,
        });

        this.onResetCheckIn();
        Utils.info(i18next.t("tk_save_complete"));
        document.getElementById("checkInSave").disabled = false;
        NProgress.done();
      } catch (error) {
        this.onResetCheckIn();
        document.getElementById("checkInSave").disabled = false;
        NProgress.done();
        Utils.info(i18next.t("tk_check_in_error"));
        Utils.log(error);
      }
    },
    async onSubmitCheckOut() {
      document.getElementById("checkOutSave").disabled = true;
      NProgress.start();
      try {
        let basketNumber = parseInt(this.basketNumberCheckOut.split("-")[2]);

        const user = await Auth.getCurrentUser();

        await http.post("/api/heating/pre-check-out", {
          basketString: this.basketNumberCheckOut.toUpperCase(),
          basketNumber,
          personId: user.PersonId,
        });

        this.onResetCheckOut();
        Utils.info(i18next.t("tk_save_complete"));
        document.getElementById("checkOutSave").disabled = false;
        NProgress.done();
      } catch (error) {
        this.onResetCheckOut();
        document.getElementById("checkOutSave").disabled = false;
        NProgress.done();
        Utils.info(i18next.t("tk_repeat_check_out_error"));
        Utils.log(error);
      }
    },
    onResetCheckIn() {
      this.basketNumberCheckIn = "";
      this.roomStringCheckIn = "";
    },
    onResetCheckOut() {
      this.basketNumberCheckOut = "";
    },
  };
};
