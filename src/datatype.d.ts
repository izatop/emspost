interface ILocationProperty {
    name:string;
    value:string;
    type:string;
}

interface ICalculationProperty {
    price:number;
    term:{
        min:number;
        max:number;
    }
}

interface ILocation {
    name:string;
    code:string;
}

interface IDeliveryPeriod {
    max:number;
    min:number;
}