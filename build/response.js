var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var datatype_1 = require('./datatype');
var Response;
(function (Response) {
    var State;
    (function (State) {
        State[State["none"] = 0] = "none";
        State[State["success"] = 1] = "success";
        State[State["fail"] = 2] = "fail";
    })(State || (State = {}));
    var Result = (function () {
        function Result(response) {
            this.state = State.none;
            this.error = "";
            this.errno = 0;
            this._response = {};
            this._response = response;
            switch (response.stat) {
                case 'ok':
                    this.state = State.success;
                    break;
                default:
                    this.state = State.fail;
                    this.error = this._response.err.msg;
                    this.errno = this._response.err.code;
            }
            if (!this.errno) {
                this.extract();
            }
        }
        /**
         * An abstract method that will be called after constructor initialization
         * and intended for response data preparation.
         */
        Result.prototype.extract = function () { };
        return Result;
    })();
    var EchoResult = (function (_super) {
        __extends(EchoResult, _super);
        function EchoResult() {
            _super.apply(this, arguments);
        }
        EchoResult.prototype.extract = function () {
            this.echo = this.state == State.success
                && this._response.msg == "successeful";
        };
        return EchoResult;
    })(Result);
    Response.EchoResult = EchoResult;
    var LocationsResult = (function (_super) {
        __extends(LocationsResult, _super);
        function LocationsResult() {
            _super.apply(this, arguments);
        }
        LocationsResult.prototype.extract = function () {
            this.locations = [];
            for (var _i = 0, _a = this._response.locations; _i < _a.length; _i++) {
                var location = _a[_i];
                this.locations.push(new datatype_1.DataType.Location(location));
            }
        };
        return LocationsResult;
    })(Result);
    Response.LocationsResult = LocationsResult;
    var MaxWeightResult = (function (_super) {
        __extends(MaxWeightResult, _super);
        function MaxWeightResult() {
            _super.apply(this, arguments);
        }
        MaxWeightResult.prototype.extract = function () {
            this.weight = Number(this._response.max_weight);
        };
        return MaxWeightResult;
    })(Result);
    Response.MaxWeightResult = MaxWeightResult;
    var CalculationResult = (function (_super) {
        __extends(CalculationResult, _super);
        function CalculationResult() {
            _super.apply(this, arguments);
        }
        CalculationResult.prototype.extract = function () {
            this.calculation = new datatype_1.DataType.Calculation(this._response);
        };
        return CalculationResult;
    })(Result);
    Response.CalculationResult = CalculationResult;
})(Response = exports.Response || (exports.Response = {}));
//# sourceMappingURL=response.js.map