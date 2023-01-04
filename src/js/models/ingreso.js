import { Dato } from './dato';

export class Ingreso extends Dato {
    static contadorIngresos = 0;

    constructor(nombre, valor) {
        super(nombre, valor);
        this._id = ++Ingreso.contadorIngresos;
    }

    get id() {
        return this._id;
    }

    static obtenerIngresos = () => {
        const ingresosData = JSON.parse(localStorage.getItem("ingresos-data") ?? "[]");
        const ingresos = ingresosData.map(income => new Ingreso(income._nombre, income._valor))
        return ingresos
    }

    static obtenerTotal = () => {
        const ingresos = Ingreso.obtenerIngresos()
        let total = 0;
        for (const ingreso of ingresos) {
            total += ingreso.valor;
        }
        return total
    }

    static eliminarIngreso(id) {
        const ingresos = Ingreso.obtenerIngresos()

        let indice = ingresos.findIndex(ingreso => ingreso.id === id);
        ingresos.splice(indice, 1);

        const ingresosData = JSON.stringify(ingresos);
        localStorage.setItem("ingresos-data", ingresosData)
    }

    guardarIngreso() {
        const ingresos = Ingreso.obtenerIngresos()
        ingresos.push(this)
        const ingresosData = JSON.stringify(ingresos);
        localStorage.setItem("ingresos-data", ingresosData)
    }
}