import http from "./http.js";

const Auth = {
  async getCurrentUser() {
    try {
      const token = localStorage.getItem("my_token");
      if (token === null) return null;
      const response = await http.post(`/api/auth/me`, JSON.parse(token));
      return response.data;
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      return null;
    }
  },
  refreshToken() {
    let token = JSON.parse(localStorage.getItem("my_token"));
    if (token) {
      token = token.Token;
    } else token = null;
    axios.defaults.headers.common["Authorization"] = token;
  },
};

export default Auth;
