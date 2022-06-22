import Utils from "../../../../services/utils.js";
import http from "../../../../services/http.js";
import Auth from "../../../../services/auth.js";

const onBasketNumberValid = (self) => {
  const isEmpty = validator.isEmpty(self.basketNumber, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_basket_number_is_required");
  if (self.basketNumber.split("-").length !== 3) return i18next.t("tk_basket_number_format_error");
  const isInt = validator.isInt(self.basketNumber.split("-")[2], { min: 1, max: 1000 });
  if (!isInt) return i18next.t("tk_basket_number_format_error");
  return null;
};

const onGrossWeightValid = (self) => {
  const isInt = validator.isInt(self.grossWeight, { min: 0, max: 1000 });
  if (!isInt) return i18next.t("tk_gross_weight_is_wrong");
  return null;
};

const onNetWeightValid = (self) => {
  const isInt = validator.isInt(self.netWeight, { min: 0, max: 1000 });
  if (!isInt) return i18next.t("tk_net_weight_is_wrong");
  return null;
};

const onTareWeightValid = (self) => {
  const isInt = validator.isInt(self.tareWeight, { min: 0, max: 1000 });
  if (!isInt) return i18next.t("tk_tare_weight_is_wrong");
  return null;
};
const onCategoryValid = (self) => {
  const isEmpty = validator.isEmpty(self.selectedCategory.value, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_category_is_required");
  return null;
};
const onSourceValid = (self) => {
  const isEmpty = validator.isEmpty(self.selectedSource.value, { ignore_whitespace: true });
  if (isEmpty) return i18next.t("tk_source_is_required");
  return null;
};

const onCategoryChoicesInit = (self) => {
  self.categoryChoices = new Choices(self.$refs.categorySelector, {
    shouldSort: false,
    position: "bottom",
    choices: [
      { id: 0, value: "", label: "请选择回炉料种类", disabled: true, selected: true },
      { id: 1, value: "M1", label: "报废缸体" },
      { id: 2, value: "M2", label: "料饼" },
      { id: 3, value: "M3", label: "真空流道和渣包" },
      { id: 3, value: "M4", label: "切边余料" },
      { id: 3, value: "M5", label: "烫模件" },
    ],
    classNames: {
      containerOuter: "choices mb-1",
      containerInner: "choices__inner",
    },
  });
};
const onSourceChoicesInit = (self) => {
  self.sourceChoices = new Choices(self.$refs.sourceSelector, {
    shouldSort: false,
    position: "bottom",
    choices: [
      { id: 0, value: "", label: "请选择回炉料来源", disabled: true, selected: true },
      { id: 1, value: "S1", label: "压铸机台返回" },
      { id: 2, value: "S2", label: "切边返回" },
      { id: 3, value: "S3", label: "外部退回报废" },
    ],
    classNames: {
      containerOuter: "choices mb-1",
      containerInner: "choices__inner",
    },
  });
};
const doScanBasket = async (self) => {
  try {
    let data = {
      basketNumber: isNaN(parseInt(self.basketNumber)) ? 0 : parseInt(self.basketNumber),
    };
    let response = await http.post(`/api/melting/returns/basket-weight`, data);
    const basketWeight = response.data[0].Weight;
    self.tareWeight = basketWeight.toString();
  } catch (error) {
    Utils.info(i18next.t("tk_wrong_basket"));
    Utils.log(error);
  }
};

window.ReturnsWeighingService = () => {
  return {
    grossWeight: "0",
    netWeight: "0",
    tareWeight: "0",
    basketNumber: "",
    personId: "",
    barcode: "",
    isBasketNumberValid() {
      return onBasketNumberValid(this);
    },
    isGrossWeightValid() {
      return onGrossWeightValid(this);
    },
    isNetWeightValid() {
      return onNetWeightValid(this);
    },
    isTareWeightValid() {
      return onTareWeightValid(this);
    },
    selectedCategory: { value: "" },
    categoryChoices: {},
    isCategoryValid() {
      return onCategoryValid(this);
    },
    categoryChoicesInit() {
      onCategoryChoicesInit(this);
    },
    selectedSource: { value: "" },
    sourceChoices: {},
    isSourceValid() {
      return onSourceValid(this);
    },
    sourceChoicesInit() {
      onSourceChoicesInit(this);
    },
    onInit() {
      this.personId = this.$store.currentUser.profile.PersonId;
    },
    onSubmit() {},
    async onScanBasket() {
      await doScanBasket(this);
    },
    getWeight(payload) {
      try {
        let weight = payload.trim().split(",")[2].trim().toUpperCase().slice(0, -2).trim();
        this.grossWeight = weight;
        const netWeight = parseInt(this.grossWeight) - parseInt(this.tareWeight);
        this.netWeight = netWeight.toString();
      } catch (error) {
        console.error(error);
      }
    },
    onPrint() {
      try {
        this.barcode = `${this.selectedCategory.value}*${this.netWeight}*${this.personId}*${
          this.selectedSource.value
        }*${moment().format("YY-MM-DD, HH:MM:SS")}`;
        JsBarcode("#barcode", this.barcode, {
          width: 1,
        });

        let printdata = document.getElementById("print");
        let newwin = window.open();
        newwin.document.write(printdata.outerHTML);
        newwin.document.getElementById("print").style.display = "block";
        newwin.print();
        newwin.close();
      } catch (error) {
        console.error(error);
      }
    },
  };
};
