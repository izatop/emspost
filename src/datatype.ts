/// <reference path="datatype.d.ts" />

export module DataType {
    export class Location implements ILocation {
        public name:string;
        public code:string;

        constructor(data:ILocationProperty) {
            this.name = (data.name || "");
            this.code = data.value;
        }
    }

    export class Calculation {
        public price:number;
        public period:IDeliveryPeriod;

        constructor(data:ICalculationProperty) {
            this.price = Number(data.price);
            this.period = {
                max: Number(data.term.max),
                min: Number(data.term.min)
            }
        }
    }
}