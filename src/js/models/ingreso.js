import {Dato} from './dato';

export class Ingreso extends Dato {
    static contadorIngresos = 0;

    constructor(nombre, valor) {
        super(nombre, valor);
        this._id = ++Ingreso.contadorIngresos;
    }

    get id() {
        return this._id;
    }
}