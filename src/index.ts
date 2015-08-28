/// <reference path="../typings/tsd.d.ts" />
/// <reference path="request.d.ts" />

import {Client} from './request';
import {Response} from './response';
import {DataType} from './datatype';

interface CalculationProperties {
    from?:string;
    to:string;
    weight:number;
    type?:string;
}

export class API {
    client:Client;

    constructor() {
        this.client = new Client();
    }

    /**
     * @returns {Promise<boolean>}
     */
    echo():Promise<boolean> {
        return this.client.call('ems.test.echo').then(result => {
            return (new Response.EchoResult(result)).echo;
        });
    }

    /**
     * @returns {Promise<DataType.Location[]>}
     */
    getCountries():Promise<DataType.Location[]> {
        return this.client.call('ems.get.locations', [{type: "countries"}, {plain: "true"}]).then(result => {
            return (new Response.LocationsResult(result)).locations;
        });
    }

    /**
     * @returns {Promise<DataType.Location[]>}
     */
    getCities():Promise<DataType.Location[]> {
        return this.client.call('ems.get.locations', [{type: "cities"}, {plain: "true"}]).then(result => {
            return (new Response.LocationsResult(result)).locations;
        });
    }

    /**
     * @returns {Promise<DataType.Location[]>}
     */
    getRegions():Promise<DataType.Location[]> {
        return this.client.call('ems.get.locations', [{type: "regions"}, {plain: "true"}]).then(result => {
            return (new Response.LocationsResult(result)).locations;
        });
    }

    /**
     * @returns {Promise<number>}
     */
    getMaxWeight():Promise<number> {
        return this.client.call('ems.get.max.weight').then(result => {
            return (new Response.MaxWeightResult(result)).weight;
        });
    }

    /**
     * @param {{from?:string, to:string, weight:number, type?:string}} properties
     * @returns {Promise<*>}
     */
    calculate(properties:CalculationProperties):Promise<DataType.Calculation> {
        let query:RequestParameter[] = [
            {from: properties.from},
            {to: properties.to},
            {weight: properties.weight},
            {type: properties.type}
        ];

        return this.client.call('ems.calculate', query).then(result => {
            return (new Response.CalculationResult(result)).calculation;
        });
    }
}
