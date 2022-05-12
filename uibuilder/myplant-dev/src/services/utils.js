const Utils = {
  // --------------------------------
  //  Parse a url and break it into resource, id and verb
  // --------------------------------
  parseRequestURL() {
    const query = location.hash.slice(1).toLowerCase() || "/";
    const url = query.split("?")[0];
    const params = new URLSearchParams(query.split("?")[1]);
    return { url, params };
  },

  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  // --------------------------------
  //  hmtl template
  // --------------------------------
  template(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "document";
      xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
          resolve(xhr.response.documentElement.innerHTML);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
  },

  // --------------------------------
  //  toastify
  // --------------------------------
  info(msg) {
    Toastify({
      text: `${msg}`,
      duration: 5000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  },
  log(error) {
    // Request made and server responded
    if (error.response) {
      console.log("response data:", error.response.data);
      console.log("status code:", error.response.status);
      console.log("response headers:", error.response.headers);
    }
    // // The request was made but no response was received
    if (error.request) {
      console.log("request:", error.request);
    }
    // Something happened in setting up the request that triggered an Error
    console.log("error message:", error.message);
  },
};

export default Utils;
