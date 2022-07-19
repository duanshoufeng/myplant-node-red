"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function template(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.responseType = "document";
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response.documentElement.innerHTML);
            }
            else {
                reject(status);
            }
        };
        xhr.send();
    });
}
exports.default = template;
//# sourceMappingURL=template.js.map