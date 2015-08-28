var Client = (function () {
    function Client() {
        this.url = "http://emspost.ru/api/rest/";
    }
    /**
     * @param method
     * @param parameters
     * @returns {Promise<T>|Promise}
     */
    Client.prototype.call = function (method, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = []; }
        return new Promise(function (resolve, reject) {
            request(_this.build(method, parameters), function (error, response, body) {
                if (error) {
                    return reject(error);
                }
                if (response.statusCode != 200) {
                    reject(new Error("Unexpected HTTP status code: " + response.statusCode));
                }
                else if (!body || typeof body != "object" || body.hasOwnProperty('rsp') === false) {
                    reject(new Error("Unexpected response: " + body));
                }
                else {
                    resolve(body.rsp);
                }
            });
        });
    };
    /**
     * @param method
     * @param parameters
     * @returns {{url: string, json: boolean}}
     */
    Client.prototype.build = function (method, parameters) {
        if (parameters === void 0) { parameters = []; }
        var qs = [];
        for (var _i = 0; _i < parameters.length; _i++) {
            var value = parameters[_i];
            if (Object.keys(value).length) {
                var key = Object.keys(value)[0];
                qs.push([key, value[key]].join('='));
            }
        }
        var url = this.url + '?method=' + method;
        if (qs.length) {
            url += '&' + qs.join('&');
        }
        return { url: url, json: true };
    };
    return Client;
})();
exports.Client = Client;
//# sourceMappingURL=client.js.map