/// <reference path="../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var request = require('request');
var Location = (function () {
    function Location() {
    }
    return Location;
})();
var CalculationResult = (function () {
    function CalculationResult() {
    }
    return CalculationResult;
})();
var ResponseState;
(function (ResponseState) {
    ResponseState[ResponseState["none"] = 0] = "none";
    ResponseState[ResponseState["success"] = 1] = "success";
    ResponseState[ResponseState["fail"] = 2] = "fail";
})(ResponseState || (ResponseState = {}));
var Response = (function () {
    function Response(response) {
        this._response = response;
        switch (response.rsp.stat) {
            case 'ok':
                this.state = ResponseState.success;
                break;
            default:
                this.state = ResponseState.fail;
                this.error = this._response.err.msg;
                this.errno = this._response.err.code;
        }
        this.extract();
    }
    Response.prototype.extract = function () { };
    return Response;
})();
var ResponseEcho = (function (_super) {
    __extends(ResponseEcho, _super);
    function ResponseEcho() {
        _super.apply(this, arguments);
    }
    ResponseEcho.prototype.extract = function () {
        this.echo = this._response.msg == "successeful";
    };
    return ResponseEcho;
})(Response);
var ResponseLocations = (function (_super) {
    __extends(ResponseLocations, _super);
    function ResponseLocations() {
        _super.apply(this, arguments);
    }
    ResponseLocations.prototype.extract = function () {
        this.locations = this._response.locations.map(function (location) { return new Location(location); });
    };
    return ResponseLocations;
})(Response);
var Client = (function () {
    function Client() {
        this.url = "http://emspost.ru/api/rest/";
    }
    Client.prototype.call = function (method, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = {}; }
        return new Promise(function (resolve, reject) {
            request(_this.build(method, parameters), function (error, response, body) {
                resolve(body);
            });
        });
    };
    Client.prototype.build = function (method, parameters) {
        if (parameters === void 0) { parameters = {}; }
        return {
            url: this.url + '?method=' + method,
            json: true
        };
    };
    return Client;
})();
var API = (function () {
    function API() {
        this.client = new Client();
    }
    API.prototype.echo = function () {
        return this.client.call('ems.test.echo').then(function (result) {
            var response = new ResponseEcho(result);
            return response.echo;
        });
    };
    API.prototype.getCountries = function () {
        return this.client.call('ems.get.locations', { type: "countries" }).then(function (result) {
            var response = new ResponseLocations(result);
            return response.locations;
        });
    };
    API.prototype.getMaxWeight = function () {
        return this.client.call('ems.test.echo').then(function (result) {
            var response = new ResponseEcho(result);
            return 1;
        });
    };
    API.prototype.calculate = function () {
        return this.client.call('ems.test.echo').then(function (result) {
            var response = new ResponseEcho(result);
            return new CalculationResult();
        });
    };
    return API;
})();
exports.API = API;
