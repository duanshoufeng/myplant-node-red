import Utils from "../../../../services/utils.js";
import http from "../../../../services/http.js";
import Auth from "../../../../services/auth.js";

window.AluminumTrackingService = () => {
  return {
    tag: 1,
    ladleNumber: "",
    towerNumber: "",
    degassMachineNumber: "",
    furnaceNumber: "",
    aluminumTempAfter: "",
    aluminumTempBefore: "",
    selectedAluminumWeight: { value: "" },
    aluminumWeightChoices: [],
    aluminumWeightChoicesInit() {
      this.aluminumWeightChoices = new Choices(this.$refs.aluminumWeightSelector, {
        shouldSort: false,
        position: "bottom",
        choices: [
          { id: 0, value: "", label: "请选择铝液重量", disabled: true, selected: true },
          { id: 1, value: "800", label: "800kg" },
          { id: 2, value: "1200", label: "1200kg" },
        ],
        classNames: {
          containerOuter: "choices mb-1",
          containerInner: "choices__inner",
        },
      });
    },
    isAluminumTempBeforeValid() {
      const isEmpty = validator.isEmpty(this.aluminumTempBefore, { ignore_whitespace: true });
      if (isEmpty) return i18next.t("tk_aluminum_temp_before_is_required");
      const isInt = validator.isInt(this.aluminumTempBefore, { min: 710, max: 740 });
      if (!isInt) return i18next.t("tk_aluminum_temp_before_is_wrong");
      return null;
    },
    isAluminumTempAfterValid() {
      const isEmpty = validator.isEmpty(this.aluminumTempAfter, { ignore_whitespace: true });
      if (isEmpty) return i18next.t("tk_aluminum_temp_after_is_required");
      const isInt = validator.isInt(this.aluminumTempAfter, { min: 690, max: 720 });
      if (!isInt) return i18next.t("tk_aluminum_temp_after_is_wrong");
      return null;
    },
    isAluminumWeightValid() {
      const isEmpty = validator.isEmpty(this.selectedAluminumWeight.value, { ignore_whitespace: true });
      if (isEmpty) return i18next.t("tk_aluminum_weight_is_required");
      return null;
    },
    isLadleNumberValid() {
      const isEmpty = validator.isEmpty(this.ladleNumber, { ignore_whitespace: true });
      if (isEmpty) return i18next.t("tk_ladle_number_is_required");
      return null;
    },
    isTowerNumberValid() {
      const isEmpty = validator.isEmpty(this.towerNumber, { ignore_whitespace: true });
      if (isEmpty) return i18next.t("tk_tower_number_is_required");
      return null;
    },
    isDegassMachineNumberValid() {
      const isEmpty = validator.isEmpty(this.degassMachineNumber, { ignore_whitespace: true });
      if (isEmpty) return i18next.t("tk_degass_machine_number_is_required");
      return null;
    },
    isFurnaceNumberValid() {
      const isEmpty = validator.isEmpty(this.furnaceNumber, { ignore_whitespace: true });
      if (isEmpty) return i18next.t("tk_furnace_number_is_required");
      return null;
    },
    selectedMachine: { value: "" },
    machineChoices: [],
    isMachineValid() {
      const isEmpty = validator.isEmpty(this.selectedMachine.value, { ignore_whitespace: true });
      if (isEmpty) return "工序不能为空";
      return null;
    },
    machineChoicesInit() {
      this.machineChoices = new Choices(this.$refs.machineSelector, {
        shouldSort: false,
        position: "bottom",
        choices: [
          { id: 0, value: "", label: "请选择工序", disabled: true, selected: true },
          { id: 1, value: "5501", label: "出水" },
          { id: 2, value: "5502", label: "除气" },
          { id: 3, value: "5503", label: "加水" },
        ],
        classNames: {
          containerOuter: "choices mb-1",
          containerInner: "choices__inner",
        },
      });
    },
    selectedProduct: { value: "" },
    productChoices: [],
    isProductValid() {
      const isEmpty = validator.isEmpty(this.selectedProduct.value, { ignore_whitespace: true });
      if (isEmpty) return "产品不能为空";
      return null;
    },
    productChoicesInit() {
      this.productChoices = new Choices(this.$refs.productSelector, {
        shouldSort: false,
        position: "bottom",
        choices: [
          { id: 0, value: "", label: "请选择产品", disabled: true, selected: true },
          { id: 1, value: "BBCQ00801B", label: "M254 E20" },
          { id: 2, value: "BBCQ00803B", label: "M254 E15" },
        ],
        classNames: {
          containerOuter: "choices mb-1",
          containerInner: "choices__inner",
        },
      });
    },
    onInit() {},
    onReset() {
      // return to first step
      this.tag = 1;

      // clear history data
      this.machineChoices.setChoiceByValue("");
      this.selectedMachine.value = "";
      this.productChoices.setChoiceByValue("");
      this.selectedProduct.value = "";
      this.ladleNumber = "";
      this.selectedAluminumWeight.value = "";
      this.aluminumWeightChoices.setChoiceByValue("");
      this.towerNumber = "";
      this.aluminumTempAfter = "";
      this.aluminumTempBefore = "";
      this.degassMachineNumber = "";
    },
    async onFirstSubmit() {
      try {
        let data = {
          machine: parseInt(this.selectedMachine.value),
          product: this.selectedProduct.value,
          ladle: isNaN(parseInt(this.ladleNumber)) ? 0 : parseInt(this.ladleNumber),
        };
        let response = await http.post(`/api/melting/aluminum/process-step`, data);
        const nextStep = response.data.nextStep;
        if (nextStep === "A") {
          this.tag = 2;
        } else if (nextStep === "B") {
          this.tag = 3;
        } else {
          this.tag = 4;
        }
      } catch (error) {
        Utils.info(i18next.t("tk_wrong_ladle"));
        Utils.log(error);
      }
    },
    async onSecondSubmit() {
      try {
        let rawData = {
          tower: isNaN(parseInt(this.towerNumber)) ? 0 : parseInt(this.towerNumber),
          aluminumWeight: isNaN(parseInt(this.selectedAluminumWeight.value))
            ? 0
            : parseInt(this.selectedAluminumWeight.value),
          personId: parseInt(this.$store.currentUser.profile.PersonId),
          aluminumTempBefore: isNaN(parseInt(this.aluminumTempBefore)) ? 0 : parseInt(this.aluminumTempBefore),
        };
        let data = {
          machine: parseInt(this.selectedMachine.value),
          product: this.selectedProduct.value,
          ladle: isNaN(parseInt(this.ladleNumber)) ? 0 : parseInt(this.ladleNumber),
          tower: isNaN(parseInt(this.towerNumber)) ? 0 : parseInt(this.towerNumber),
          rawData: JSON.stringify(rawData),
        };
        await http.post(`/api/melting/aluminum/export`, data);
        this.onReset();
        Utils.info(i18next.t("tk_aluminum_export_finished"));
      } catch (error) {
        Utils.info(i18next.t("tk_wrong_tower"));
        Utils.log(error);
      }
    },
    async onThirdSubmit() {
      try {
        let rawData = {
          degassMachine: isNaN(parseInt(this.degassMachineNumber)) ? 0 : parseInt(this.degassMachineNumber),
          aluminumTempAfter: isNaN(parseInt(this.aluminumTempAfter)) ? 0 : parseInt(this.aluminumTempAfter),
          personId: parseInt(this.$store.currentUser.profile.PersonId),
        };
        let data = {
          machine: parseInt(this.selectedMachine.value),
          product: this.selectedProduct.value,
          ladle: isNaN(parseInt(this.ladleNumber)) ? 0 : parseInt(this.ladleNumber),
          degassMachine: isNaN(parseInt(this.degassMachineNumber)) ? 0 : parseInt(this.degassMachineNumber),
          rawData: JSON.stringify(rawData),
        };
        await http.post(`/api/melting/aluminum/degassing`, data);
        this.onReset();
        Utils.info(i18next.t("tk_aluminum_degassing_finished"));
      } catch (error) {
        Utils.info(i18next.t("tk_wrong_degass_machine"));
        Utils.log(error);
      }
    },
    async onFourthSubmit() {
      try {
        let rawData = {
          furnace: isNaN(parseInt(this.furnaceNumber)) ? 0 : parseInt(this.furnaceNumber),
          personId: parseInt(this.$store.currentUser.profile.PersonId),
        };
        let data = {
          machine: parseInt(this.selectedMachine.value),
          product: this.selectedProduct.value,
          ladle: isNaN(parseInt(this.ladleNumber)) ? 0 : parseInt(this.ladleNumber),
          furnace: isNaN(parseInt(this.furnaceNumber)) ? 0 : parseInt(this.furnaceNumber),
          rawData: JSON.stringify(rawData),
        };
        await http.post(`/api/melting/aluminum/charging`, data);
        this.onReset();
        Utils.info(i18next.t("tk_aluminum_charging_finished"));
      } catch (error) {
        Utils.info(i18next.t("tk_wrong_furnace"));
        Utils.log(error);
      }
    },
  };
};
