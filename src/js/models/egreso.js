import { Dato } from './dato';

export class Egreso extends Dato {
    static contadorEgresos = 0;

    constructor(nombre, valor) {
        super(nombre, valor);
        this._id = ++Egreso.contadorEgresos;
    }

    get id() {
        return this._id;
    }

    static obtenerEgresos = () => {
        const egresosData = JSON.parse(localStorage.getItem("egresos-data") ?? "[]");
        const egresos = egresosData.map(outcome => new Egreso(outcome._nombre, outcome._valor));
        return egresos
    }

    static obtenerTotal = () => {
        const egresos = Egreso.obtenerEgresos()
        let total = 0;
        for (const egreso of egresos) {
            total += egreso.valor;
        }
        return total
    }

    static eliminarEgreso(id) {
        const egresos = Egreso.obtenerEgresos();
        
        let indice = egresos.findIndex(ingreso => ingreso.id === id);
        egresos.splice(indice, 1);

        const egresosData = JSON.stringify(egresos);
        localStorage.setItem("egresos-data", egresosData)
    }

    guardarEgreso(){
        const egresos = Egreso.obtenerEgresos()
        egresos.push(this)
        const egresosData = JSON.stringify(egresos);
        localStorage.setItem("egresos-data", egresosData)
    }
}