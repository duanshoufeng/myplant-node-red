import Utils from "../../../../services/utils";
import http from "../../../../services/http";
import { feedingDataGridOptions } from "./config";
import { feedingChart1, feedingChart2 } from "./controller";

const onFilterTextBoxChanged = () => {
  feedingDataGridOptions.api.setQuickFilter(document.getElementById("filter-text").value);
};

// x-data
window.ChargeHistoryService = () => {
  return {
    startDate: "",
    isStartDateValid() {
      const isEmpty = validator.isEmpty(this.startDate, { ignore_whitespace: true });
      if (isEmpty) return "开始日期不能为空";
      return null;
    },
    endDate: "",
    isEndDateValid() {
      let isEmpty = validator.isEmpty(this.endDate, { ignore_whitespace: true });
      if (isEmpty) return "结束日期不能为空";

      isEmpty = validator.isEmpty(this.startDate, { ignore_whitespace: true });
      if (isEmpty) return "开始日期不能为空";

      let isBefore = validator.isBefore(this.endDate, this.startDate);
      if (isBefore) return "结束日期不能在开始日期之前";

      return null;
    },
    selectedShifts: [],
    shiftChoices: [],
    isShiftValid() {
      if (this.selectedShifts.length === 0) return "班次不能为空";
      return null;
    },
    shiftChoicesInit() {
      this.shiftChoices = new Choices(this.$refs.shiftSelector, {
        shouldSort: false,
        position: "bottom",
        removeItemButton: true,
        choices: [
          { id: 1, value: "1", label: "早班", selected: true },
          { id: 2, value: "2", label: "中班", selected: true },
          { id: 3, value: "3", label: "夜班", selected: true },
        ],
        classNames: {
          containerOuter: "choices mb-1",
          containerInner: "choices__inner",
          inputCloned: "choices__input--cloned w-1",
        },
      });
      this.selectedShifts = this.shiftChoices.getValue(true);
      this.shiftChoices.passedElement.element.addEventListener(
        "addItem",
        (event) => {
          this.selectedShifts = this.shiftChoices.getValue(true);
        },
        false
      );
      this.shiftChoices.passedElement.element.addEventListener(
        "removeItem",
        (event) => {
          this.selectedShifts = this.shiftChoices.getValue(true);
        },
        false
      );
    },
    selectedTowers: [],
    towerChoices: [],
    isTowerValid() {
      if (this.selectedTowers.length === 0) return "炉号不能为空";
      return null;
    },
    towerChoicesInit() {
      this.towerChoices = new Choices(this.$refs.towerSelector, {
        shouldSort: false,
        position: "bottom",
        removeItemButton: true,
        choices: [
          { id: 1, value: "T01", label: "1号炉", selected: true },
          { id: 2, value: "T02", label: "2号炉", selected: true },
          { id: 3, value: "T03", label: "3号炉", selected: true },
        ],
        classNames: {
          containerOuter: "choices mb-1",
          containerInner: "choices__inner",
          inputCloned: "choices__input--cloned w-1",
        },
      });
      this.selectedTowers = this.towerChoices.getValue(true);
      this.towerChoices.passedElement.element.addEventListener(
        "addItem",
        (event) => {
          this.selectedTowers = this.towerChoices.getValue(true);
        },
        false
      );
      this.towerChoices.passedElement.element.addEventListener(
        "removeItem",
        (event) => {
          this.selectedTowers = this.towerChoices.getValue(true);
        },
        false
      );
    },
    onExport() {
      feedingDataGridOptions.api.exportDataAsCsv();
    },
    async onSubmit() {
      feedingDataGridOptions.api.showLoadingOverlay();

      const data = {
        startDate: moment(this.startDate).add(7, "h").add(30, "m").format("YYYY-MM-DD HH:mm:ss"),
        endDate: moment(this.endDate).add(1, "d").add(7, "h").add(30, "m").format("YYYY-MM-DD HH:mm:ss"),
        shift: this.shiftChoices.getValue(true),
        machine: this.towerChoices.getValue(true),
      };

      const response = await http.get(`/api/melting/data/all`, {
        params: data,
      });

      feedingDataGridOptions.api.setRowData(response.data);

      if (response.data.length > 0) {
        const newMaterial = response.data
          .filter((x) => x.Category === "新料")
          .map((x) => x.Weight)
          .reduce((x, y) => x + y);
        const oldMaterial = response.data
          .filter((x) => x.Category === "旧料")
          .map((x) => x.Weight)
          .reduce((x, y) => x + y);
        const ingot = response.data
          .filter((x) => x.Material === "铝锭")
          .map((x) => x.Weight)
          .reduce((x, y) => x + y);
        const warmup =
          response.data.filter((x) => x.Material === "烫模件").length > 0
            ? response.data
                .filter((x) => x.Material === "烫模件")
                .map((x) => x.Weight)
                .reduce((x, y) => x + y)
            : 0;
        const scrap =
          response.data.filter((x) => x.Material === "报废缸体").length > 0
            ? response.data
                .filter((x) => x.Material === "报废缸体")
                .map((x) => x.Weight)
                .reduce((x, y) => x + y)
            : 0;
        const vacumme =
          response.data.filter((x) => x.Material === "真空流道和渣包").length > 0
            ? response.data
                .filter((x) => x.Material === "真空流道和渣包")
                .map((x) => x.Weight)
                .reduce((x, y) => x + y)
            : 0;
        const biscuit =
          response.data.filter((x) => x.Material === "料饼").length > 0
            ? response.data
                .filter((x) => x.Material === "料饼")
                .map((x) => x.Weight)
                .reduce((x, y) => x + y)
            : 0;
        const chips =
          response.data.filter((x) => x.Material === "切边余料").length > 0
            ? response.data
                .filter((x) => x.Material === "切边余料")
                .map((x) => x.Weight)
                .reduce((x, y) => x + y)
            : 0;

        feedingChart1.updateSeries([newMaterial, oldMaterial], false);
        feedingChart2.updateSeries([ingot, warmup, scrap, vacumme, biscuit, chips], false);
      }
    },
  };
};
