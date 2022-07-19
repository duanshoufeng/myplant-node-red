export default function xhr(url: string) {
  return new Promise<string>(function (resolve, reject) {
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
}
