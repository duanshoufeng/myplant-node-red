import http from "./http";
import axios from "axios";

export default class Auth {
  static async getLoginUser() {
    try {
      const token = localStorage.getItem("my_token");
      if (token === null) return null;
      const response = await http.post(`/api/auth/me`, JSON.parse(token));
      return response.data;
    } catch (ex: any) {
      if (ex.response) {
        // Request made and server responded
        console.log(ex.response.data);
        console.log(ex.response.status);
        console.log(ex.response.headers);
      } else if (ex.request) {
        // The request was made but no response was received
        console.log(ex.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", ex.message);
      }
      return null;
    }
  }

  static refreshToken() {
    let token = JSON.parse(localStorage.getItem("my_token") ?? "");
    if (token) {
      token = token.Token;
    } else token = null;
    axios.defaults.headers.common["Authorization"] = token;
  }
}
