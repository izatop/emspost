/// <reference path="datatype.d.ts" />
var DataType;
(function (DataType) {
    var Location = (function () {
        function Location(data) {
            this.name = (data.name || "");
            this.code = data.value;
        }
        return Location;
    })();
    DataType.Location = Location;
    var Calculation = (function () {
        function Calculation(data) {
            this.price = Number(data.price);
            if (data.hasOwnProperty('term')) {
                this.period = {
                    max: Number(data.term.max),
                    min: Number(data.term.min)
                };
            }
        }
        return Calculation;
    })();
    DataType.Calculation = Calculation;
})(DataType = exports.DataType || (exports.DataType = {}));
