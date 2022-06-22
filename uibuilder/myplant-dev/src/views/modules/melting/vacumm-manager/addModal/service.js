import Utils from "../../../../../services/utils.js";
import http from "../../../../../services/http.js";
import Auth from "../../../../../services/auth";
import { vacuumManagerOptions } from "../config.js";

let formValidation = (self) => {
  return {
    isCodeValid() {
      const isEmpty = validator.isEmpty(self.code, { ignore_whitespace: true });
      if (isEmpty) return "不能为空";
      return null;
    },
    isVacuumDensityValid() {
      const isEmpty = validator.isEmpty(self.vacuumDensity, { ignore_whitespace: true });
      const isNumeric = validator.isNumeric(self.vacuumDensity);
      if (isEmpty) return "不能为空";
      if (!isNumeric) return "非数字";
      return null;
    },
    isAirDensityValid() {
      const isEmpty = validator.isEmpty(self.vacuumDensity, { ignore_whitespace: true });
      const isNumeric = validator.isNumeric(self.vacuumDensity);
      if (isEmpty) return "不能为空";
      if (!isNumeric) return "非数字";
      return null;
    },
    isCommentValid() {
      const isEmpty = validator.isEmpty(self.comment.value, { ignore_whitespace: true });
      if (isEmpty) return "备注不能为空";
      if (self.comment.value === "NOK") return "备注错误";
      return null;
    },
    isMachineValid() {
      const isEmpty = validator.isEmpty(self.selectedMachine.value, { ignore_whitespace: true });
      if (isEmpty) return "不能为空";
      return null;
    },
    isPctValid() {
      const pct = (self.airDensity - self.vacuumDensity) / self.airDensity;
      if (pct < 0 || pct > 0.025) return "输入错误";
      return null;
    },
  };
};

let machineChoices = (self) => {
  self.machineChoices = new Choices(self.$refs.machineSelector, {
    shouldSort: false,
    position: "bottom",
    choices: [
      { id: 0, value: "", label: "请选择炉号", disabled: true, selected: true },
      { id: 1, value: "HPDC09", label: "HPDC09" },
      { id: 2, value: "HPDC10", label: "HPDC10" },
      { id: 3, value: "HPDC14", label: "HPDC14" },
      { id: 3, value: "HPDC16", label: "HPDC16" },
    ],
    classNames: {
      containerOuter: "choices mb-1",
      containerInner: "choices__inner",
    },
  });
};

let commentChoices = (self) => {
  self.commentChoices = new Choices(self.$refs.commentSelector, {
    shouldSort: false,
    position: "bottom",
    choices: [
      { id: 0, value: "", label: "备注", disabled: true, selected: true },
      { id: 1, value: "OK", label: "OK" },
      { id: 2, value: "NOK", label: "NOK" },
    ],
    classNames: {
      containerOuter: "choices mb-1",
      containerInner: "choices__inner",
    },
  });
};

let myKeyboard = (self) => {
  const Keyboard = window.SimpleKeyboard.default;
  let keyboard1 = new Keyboard(".keyboard-1", {
    mergeDisplay: true,
    theme: "hg-theme-default hg-layout-default myTheme",
    layout: {
      default: ["1 2 3", "4 5 6", "7 8 9", "A B C", "{bksp} - 0"],
    },
    display: {
      "{bksp}": "删除",
    },
    onChange: (input) => {
      self.code = input;
    },
    // syncInstanceInputs: true,
  });

  let keyboard2 = new Keyboard(".keyboard-2", {
    mergeDisplay: true,
    theme: "hg-theme-default hg-layout-default myTheme",
    layout: {
      default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} . 0"],
    },
    display: {
      "{bksp}": "删除",
    },
    onChange: (input) => {
      self.vacuumDensity = input;
    },
    // syncInstanceInputs: true,
  });

  let keyboard3 = new Keyboard(".keyboard-3", {
    mergeDisplay: true,
    theme: "hg-theme-default hg-layout-default myTheme",
    layout: {
      default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} . 0"],
    },
    display: {
      "{bksp}": "删除",
    },
    onChange: (input) => {
      self.airDensity = input;
    },
    // syncInstanceInputs: true,
  });

  self.keyboard1 = keyboard1;
  self.keyboard2 = keyboard2;
  self.keyboard3 = keyboard3;
};

let resetModal = (self) => {
  self.code = "";
  self.vacuumDensity = "";
  self.airDensity = "";
  self.machineChoices.setChoiceByValue("");
  self.commentChoices.setChoiceByValue("");

  self.keyboard1.clearInput();
  self.keyboard2.clearInput();
  self.keyboard3.clearInput();
};

window.VacuumManagerForm = () => {
  return {
    showModal: false,
    code: "",
    vacuumDensity: "",
    airDensity: "",
    selectedMachine: { value: "" },
    machineChoices: [],
    machineChoicesInit() {
      machineChoices(this);
    },
    selectedPeople: { value: "" },
    peopleChoices: [],
    peopleChoicesInit() {
      peopleChoices(this);
    },
    comment: { value: "" },
    commentChoices: [],
    commentChoicesInit() {
      let self = this;
      commentChoices(self);
    },
    keyboard1: "",
    keyboard2: "",
    keyboard3: "",
    reset() {
      let self = this;
      resetModal(self);
    },
    validForm() {
      return formValidation(this);
    },
    async onSubmit() {
      try {
        const user = await Auth.getCurrentUser();

        const data = {
          Code: this.code.toUpperCase(),
          Furnace: this.selectedMachine.value,
          Vacuum: this.vacuumDensity,
          Atmospheric: this.airDensity,
          Pct: (this.airDensity - this.vacuumDensity) / this.airDensity,
          Employee: user.Username,
          Comment: this.comment.value,
        };
        await http.post(`/api/melting/vacuum/post`, data);
        Utils.info("保存成功");
        this.$dispatch("close-on-submit");
        resetModal(this);

        // update grid table
        const response = await http.get(`/api/melting/vacuum/data`);
        vacuumManagerOptions.api.setRowData(response.data);
      } catch (error) {
        console.error("Dosing Furnace Vacuum Error", error);
      }
    },
    onInit() {
      myKeyboard(this);
    },
  };
};
