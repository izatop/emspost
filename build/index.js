/// <reference path="../typings/tsd.d.ts" />
/// <reference path="request.d.ts" />
var request_1 = require('./request');
var response_1 = require('./response');
var API = (function () {
    function API() {
        this.client = new request_1.Client();
    }
    /**
     * @returns {Promise<boolean>}
     */
    API.prototype.echo = function () {
        return this.client.call('ems.test.echo').then(function (result) {
            return (new response_1.Response.EchoResult(result)).echo;
        });
    };
    /**
     * @returns {Promise<DataType.Location[]>}
     */
    API.prototype.getCountries = function () {
        return this.client.call('ems.get.locations', [{ type: "countries" }, { plain: "true" }]).then(function (result) {
            return (new response_1.Response.LocationsResult(result)).locations;
        });
    };
    /**
     * @returns {Promise<DataType.Location[]>}
     */
    API.prototype.getCities = function () {
        return this.client.call('ems.get.locations', [{ type: "cities" }, { plain: "true" }]).then(function (result) {
            return (new response_1.Response.LocationsResult(result)).locations;
        });
    };
    /**
     * @returns {Promise<DataType.Location[]>}
     */
    API.prototype.getRegions = function () {
        return this.client.call('ems.get.locations', [{ type: "regions" }, { plain: "true" }]).then(function (result) {
            return (new response_1.Response.LocationsResult(result)).locations;
        });
    };
    /**
     * @returns {Promise<number>}
     */
    API.prototype.getMaxWeight = function () {
        return this.client.call('ems.get.max.weight').then(function (result) {
            return (new response_1.Response.MaxWeightResult(result)).weight;
        });
    };
    /**
     * @param {{from?:string, to:string, weight:number, type?:string}} properties
     * @returns {Promise<*>}
     */
    API.prototype.calculate = function (properties) {
        var query = [
            { from: properties.from },
            { to: properties.to },
            { weight: properties.weight },
            { type: properties.type }
        ];
        return this.client.call('ems.calculate', query).then(function (result) {
            return (new response_1.Response.CalculationResult(result)).calculation;
        });
    };
    return API;
})();
exports.API = API;
//# sourceMappingURL=index.js.map