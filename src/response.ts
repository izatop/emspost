import {DataType} from './datatype';

export module Response {
    enum State {
        none,
        success,
        fail
    }

    class Result {
        state:number = State.none;
        error:string = "";
        errno:number = 0;
        _response:any = {};

        constructor(response:any) {
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
        extract():void {}
    }

    export class EchoResult extends Result {
        echo:boolean;

        extract():void {
            this.echo = this.state == State.success
                && this._response.msg == "successeful";
        }
    }

    export class LocationsResult extends Result {
        locations:DataType.Location[];

        extract():void {
            this.locations = [];
            for (var location of this._response.locations) {
                this.locations.push(new DataType.Location(location));
            }
        }
    }

    export class MaxWeightResult extends Result {
        weight:number;

        extract():void {
            this.weight = Number(this._response.max_weight);
        }
    }

    export class CalculationResult extends Result {
        calculation:DataType.Calculation;

        extract():void {
            this.calculation = new DataType.Calculation(this._response);
        }
    }
}