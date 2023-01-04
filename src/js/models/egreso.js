import {Dato} from './dato';

export class Egreso extends Dato {
    static contadorEgresos = 0;

    constructor(nombre, valor) {
        super(nombre, valor);
        this._id = ++Egreso.contadorEgresos;
    }

    get id() {
        return this._id;
    }
}