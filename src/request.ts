/// <reference path="../typings/tsd.d.ts" />
/// <reference path="request.d.ts" />

import * as request from 'request';

export class Client {
    url:string;

    constructor() {
        this.url = "http://emspost.ru/api/rest/";
    }

    /**
     * @param method
     * @param parameters
     * @returns {Promise<T>|Promise}
     */
    call(method:string, parameters:RequestParameter[] = []):Promise<any> {
        return new Promise((resolve, reject) => {
            request(this.build(method, parameters), function (error, response, body) {
                if (error) {
                    return reject(error);
                }

                if (response.statusCode != 200) {
                    reject(new Error(`Unexpected HTTP status code: ${response.statusCode}`));
                } else if (!body || typeof body != "object" || body.hasOwnProperty('rsp') === false) {
                    reject(new Error(`Unexpected response: ${body}`));
                } else {
                    resolve(body.rsp);
                }
            });
        });
    }

    /**
     * @param method
     * @param parameters
     * @returns {{url: string, json: boolean}}
     */
    build(method:string, parameters:RequestParameter[] = []) {
        let qs:Array<string> = [];
        for(let value of parameters) {
            if (Object.keys(value).length) {
                let key = Object.keys(value)[0];
                qs.push([key, value[key]].join('='));
            }
        }

        var url = this.url + '?method=' + method;
        if (qs.length) {
            url += '&' + qs.join('&');
        }

        return {url, json: true}
    }
}
