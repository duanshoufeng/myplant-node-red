import Utils from "../../../../services/utils";
import http from "../../../../services/http";
import Auth from "../../../../services/auth";
import { dmcDataChartOptions } from "./chartConfig";
import { dmcDataGridOptions } from "./gridConfig";
import { dmcDataChart } from "./controller";

// x-data
window.MaterialFeedingService = () => {
  return {
    selectedTower: { value: "" },
    towerChoices: [],
    isTowerValid() {
      const isEmpty = validator.isEmpty(this.selectedTower.value, { ignore_whitespace: true });
      if (isEmpty) return "炉号不能为空";
      return null;
    },
    towerChoicesInit() {
      this.towerChoices = new Choices(this.$refs.towerSelector, {
        shouldSort: false,
        position: "bottom",
        choices: [
          { id: 0, value: "", label: "请选择炉号", disabled: true, selected: true },
          { id: 1, value: "T01", label: "1号炉" },
          { id: 2, value: "T02", label: "2号炉" },
          { id: 3, value: "T03", label: "3号炉" },
        ],
        classNames: {
          containerOuter: "choices mb-1",
          containerInner: "choices__inner",
        },
      });
    },
    selectedIsClean: { value: "" },
    isCleanChoices: [],
    isCleanValid() {
      const isEmpty = validator.isEmpty(this.selectedIsClean.value, { ignore_whitespace: true });
      if (isEmpty) return "无污染物确认不能为空";
      if (this.selectedIsClean.value === "NOK") return "无污染物确认错误";
      return null;
    },
    isCleanChoicesInit() {
      this.isCleanChoices = new Choices(this.$refs.isCleanSelector, {
        shouldSort: false,
        position: "bottom",
        choices: [
          { id: 0, value: "", label: "请确认无污染物", disabled: true, selected: true },
          { id: 1, value: "OK", label: "OK" },
          { id: 2, value: "NOK", label: "NOK" },
        ],
        classNames: {
          containerOuter: "choices mb-1",
          containerInner: "choices__inner",
        },
      });
    },
    selectedIsDry: { value: "" },
    isDryChoices: [],
    isDryValid() {
      const isEmpty = validator.isEmpty(this.selectedIsDry.value, {
        ignore_whitespace: true,
      });
      if (isEmpty) return "无水分残留不能为空";
      if (this.selectedIsDry.value === "NOK") return "无水分残留确认错误";
      return "";
    },
    isDryChoicesInit() {
      this.isDryChoices = new Choices(this.$refs.isDrySelector, {
        shouldSort: false,
        position: "bottom",
        choices: [
          { id: 0, value: "", label: "请确认无水分残留", disabled: true, selected: true },
          { id: 1, value: "OK", label: "OK" },
          { id: 2, value: "NOK", label: "NOK" },
        ],
        classNames: {
          containerOuter: "choices mb-1",
          containerInner: "choices__inner",
        },
      });
    },
    dmcInput: "",
    dmcValue: { Machine: "", DMC: "", Category: "", Level: 0, Weight: 0, Person: "", IsDry: "", IsClean: "" },
    dmcValues: [],
    async onScan() {
      const dmc = this.dmcInput.trim().toUpperCase();
      if (dmc === "") {
        Utils.info("二维码不能为空!");
        this.dmcInput = "";
        return false;
      }
      if (this.dmcValues.find((x) => x.DMC === dmc)) {
        Utils.info("不能重复扫码!");
        this.dmcInput = "";
        return false;
      }
      if (isNaN(dmc.split("/")[4]) && isNaN(dmc.split("*")[1])) {
        Utils.info("二维码格式不正确!");
        this.dmcInput = "";
        return false;
      }
      try {
        const user = await Auth.getCurrentUser();

        const response = await http.get(`/api/melting/data/duplicate?dmc=${dmc}`);
        if (response.data.length > 0) {
          Utils.info("二维码已上传!");
          this.dmcInput = "";
          return false;
        }
        // weight calculation
        let totalWeight = this.dmcValues.reduce((x, y) => x + y.Weight, 0);
        let firstLevelReturnsWeight = this.dmcValues.filter((x) => x.Level === 1).reduce((x, y) => x + y.Weight, 0);
        let secondLevelReturnsWeight = this.dmcValues.filter((x) => x.Level === 2).reduce((x, y) => x + y.Weight, 0);

        this.dmcValue.DMC = dmc;
        this.dmcValue.Category =
          (dmc.startsWith("M1*") && "报废缸体") ||
          (dmc.startsWith("M2*") && "料饼") ||
          (dmc.startsWith("M3*") && "真空流道和渣包") ||
          (dmc.startsWith("M4*") && "切边余料") ||
          (dmc.startsWith("M5*") && "烫模件") ||
          "铝锭";
        this.dmcValue.Machine = this.selectedTower.value;
        this.dmcValue.Person = user.Username;
        this.dmcValue.IsDry = this.selectedIsDry.value;
        this.dmcValue.IsClean = this.selectedIsClean.value;

        if (dmc.startsWith("M1*") || dmc.startsWith("M2*") || dmc.startsWith("M3*") || dmc.startsWith("M5*")) {
          if (this.dmcValues.find((x) => x.Level === 2)) {
            Utils.info("一级回炉料和二级回炉料不能混用!");
            this.dmcInput = "";
            return false;
          }

          this.dmcValue.Weight = Number(dmc.split("*")[1]);

          if ((this.dmcValue.Weight + firstLevelReturnsWeight) / (this.dmcValue.Weight + totalWeight) > 0.5) {
            Utils.info("一级回炉料比例不能>50%!");
            this.dmcInput = "";
            return false;
          }

          this.dmcValue.Level = 1;
          this.dmcValues.push({ ...this.dmcValue });
        } else if (dmc.startsWith("M4*")) {
          if (this.dmcValues.find((x) => x.Level === 1)) {
            Utils.info("一级回炉料和二级回炉料不能混用!");
            this.dmcInput = "";
            return false;
          }

          this.dmcValue.Weight = Number(dmc.split("*")[1]);

          if ((this.dmcValue.Weight + secondLevelReturnsWeight) / (this.dmcValue.Weight + totalWeight) > 0.1) {
            Utils.info("二级回炉料比例不能>10%!");
            this.dmcInput = "";
            return false;
          }

          this.dmcValue.Level = 2;
          this.dmcValues.push({ ...this.dmcValue });
        } else {
          this.dmcValue.Weight = Number(dmc.split("/")[4]);
          this.dmcValue.Level = 0;
          this.dmcValues.push({ ...this.dmcValue });
        }

        this.dmcInput = "";

        // update ag-grid
        dmcDataGridOptions.api.setRowData(this.dmcValues);
        // update apexcharts
        dmcDataChart.updateSeries(
          [
            { name: "新料", data: [this.dmcValues.filter((x) => x.Level === 0).reduce((x, y) => x + y.Weight, 0)] },
            { name: "旧料", data: [this.dmcValues.filter((x) => x.Level !== 0).reduce((x, y) => x + y.Weight, 0)] },
          ],
          false
        );
      } catch (err) {
        console.error("DMC Duplicate Check", err);
      }
    },
    onDelete(data) {
      if (data.Level === 0 && this.dmcValues[this.dmcValues.length - 1].Level === 1) {
        const returnsWeight = this.dmcValues.filter((x) => x.Level !== 0).reduce((x, y) => x + y.Weight, 0);
        const ingotWeight = this.dmcValues.filter((x) => x.Level === 0).reduce((x, y) => x + y.Weight, 0);
        if (returnsWeight / (ingotWeight - data.Weight) > 0.5) {
          Utils.info("一级回炉料比例>50%, 无法删除!");
          return false;
        }
      }
      if (data.Level === 0 && this.dmcValues[this.dmcValues.length - 1].Level === 2) {
        const returnsWeight = this.dmcValues.filter((x) => x.Level !== 0).reduce((x, y) => x + y.Weight, 0);
        const ingotWeight = this.dmcValues.filter((x) => x.Level === 0).reduce((x, y) => x + y.Weight, 0);
        if (returnsWeight / (ingotWeight - data.Weight) > 0.1) {
          Utils.info("二级回炉料比例>10%, 无法删除!");
          return false;
        }
      }

      const index = this.dmcValues.findIndex((x) => x.DMC === data.DMC);
      this.dmcValues.splice(index, 1);

      // update ag-grid
      dmcDataGridOptions.api.setRowData(this.dmcValues);
      // update apexcharts
      dmcDataChart.updateSeries(
        [
          { name: "新料", data: [this.dmcValues.filter((x) => x.Level === 0).reduce((x, y) => x + y.Weight, 0)] },
          { name: "旧料", data: [this.dmcValues.filter((x) => x.Level !== 0).reduce((x, y) => x + y.Weight, 0)] },
        ],
        false
      );
    },
    async onSubmit() {
      try {
        let batch = await http.get(`/api/melting/data/batch?machine=${this.selectedTower.value}`);
        const data = this.dmcValues.map((x) => ({ ...x, BatchId: batch.data[0].BatchId + 1 }));
        let response = await http.post(`/api/melting/charge/post`, data);

        this.dmcValues.length = 0;
        // update ag-grid
        dmcDataGridOptions.api.setRowData(this.dmcValues);
        // update apexcharts
        dmcDataChart.updateSeries(
          [
            { name: "新料", data: [this.dmcValues.filter((x) => x.Level === 0).reduce((x, y) => x + y.Weight, 0)] },
            { name: "旧料", data: [this.dmcValues.filter((x) => x.Level !== 0).reduce((x, y) => x + y.Weight, 0)] },
          ],
          false
        );

        this.$refs.dmcSelector.focus();
      } catch (error) {
        console.error("Melting Charge Post Error", error);
      }
    },
  };
};
