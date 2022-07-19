import http from "../../../../services/http";

window.LadleStateService = () => {
  return {
    state5018A: false,
    state5018B: false,
    state5018C: false,
    async updateLadleState(payload) {
      console.log("ladle state");
      try {
        const response = await http.get(`/api/dashboard/ladle-state`);
        const state5018 = response.data.filter((x) => x.ToolNumber === 5018)[0].Sequence;
        console.log(state5018);
        if (state5018 === "A") {
          this.state5018A = true;
          this.state5018B = false;
          this.state5018C = false;
        } else if (state5018 === "AB") {
          this.state5018A = false;
          this.state5018B = true;
          this.state5018C = false;
        } else {
          this.state5018A = false;
          this.state5018B = false;
          this.state5018C = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async onInit() {
      try {
        const response = await http.get(`/api/dashboard/ladle-state`);
        const state5018 = response.data.filter((x) => x.ToolNumber === 5018)[0].Sequence;
        if (state5018 === "A") {
          this.state5018A = true;
        } else if (state5018 === "AB") {
          this.state5018B = true;
        } else {
          this.state5018C = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
  };
};
