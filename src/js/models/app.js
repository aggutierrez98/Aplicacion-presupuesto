import { formatoMoneda } from '../helpers';
import { Egreso } from './egreso';
import { Ingreso } from './ingreso';

export class App {
    constructor() {
        this.ingresos = Ingreso.obtenerIngresos();
        this.egresos = Egreso.obtenerEgresos();
        this.totalIngresos = Ingreso.obtenerTotal();
        this.totalEgresos = Egreso.obtenerTotal();
    }

    asignarBoton() {
        document.getElementById("boton-form").addEventListener("click", () => this.agregarDato())
    }

    mostrarPresupuesto() {
        this.mostrarIngresos();
        this.mostrarEgresos();

        const total = (this.totalIngresos) - this.totalEgresos;
        document.querySelector(".cabecero-valor").innerHTML = `<h1>${formatoMoneda(total)}</h1>`

        this.agregarPorcentajes()
    }

    mostrarIngresos() {
        const ingresos = this.ingresos;
        const totalIngresos = this.totalIngresos;

        const ingresosDiv = document.querySelector(".abajo-ingreso-valor");
        ingresosDiv.innerHTML = "";

        let cont = 0;
        for (let ingreso of ingresos) {
            ingresosDiv.innerHTML += `
            <div class="valores-ingreso">
                <p>${ingreso.nombre}</p>
                <div class="valores-in"> 
                    <p>${formatoMoneda(ingreso.valor)}</p>
                    <button class="ingreso-btn-${cont}">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>`

            document.querySelector(`.ingreso-btn-${cont}`).addEventListener("click", () => this.eliminarDato(ingreso))
            cont++;
        }

        document.querySelector(".cabecero-ingreso-valor").innerHTML = `${formatoMoneda(totalIngresos)}`

        if (ingresos.length === 0) {
            ingresosDiv.classList.add("sin-ingresos")
            ingresosDiv.setAttribute('data-text', 'No incomes');
        } else {
            ingresosDiv.classList.remove("sin-ingresos");
        }

    }

    mostrarEgresos() {
        const egresos = this.egresos;
        const totalEgresos = this.totalEgresos;

        const egresosDiv = document.querySelector(".abajo-egreso-valor")
        egresosDiv.innerHTML = "";

        let cont = 0;
        for (let egreso of egresos) {
            const porcentaje = (egreso.valor / totalEgresos) * 100;
            egresosDiv.innerHTML += `
            <div class="valores-egreso">
                <p>${egreso.nombre}</p>
                <div class="valores-eg"> 
                    <p>-${formatoMoneda(egreso.valor)}</p> 
                    <div class="porcentaje"> 
                        %${porcentaje.toFixed(2)}
                    </div>
                    <button class="egreso-btn-${cont}">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>`

            document.querySelector(`.egreso-btn-${cont}`).addEventListener("click", () => this.eliminarDato(egreso))
            cont++;
        }

        document.querySelector(".cabecero-egreso-valor").innerHTML = `-${formatoMoneda(totalEgresos)}`

        if (egresos.length === 0) {
            egresosDiv.classList.add("sin-egresos")
            egresosDiv.setAttribute('data-text', 'No outcomes');
        } else {
            egresosDiv.classList.remove("sin-egresos")
        }
    }

    agregarDato() {
        let formulario = document.forms["forma"]
        let tipo = formulario["operando"].value;
        let descripcion = formulario["descripcion"].value;
        let valor = formulario["valor"].value;

        if (descripcion !== "" && valor !== "") {
            if (tipo === "ingreso") {
                const ingreso = new Ingreso(descripcion, +valor)
                ingreso.guardarIngreso();
            } else if (tipo === "egreso") {
                const egreso = new Egreso(descripcion, +valor);
                egreso.guardarEgreso();
            }
        }

        this.actualizarDatos()
    }

    eliminarDato(dato) {
        if (dato instanceof Ingreso) {
            Ingreso.eliminarIngreso(dato.id)
        } else if (dato instanceof Egreso) {
            Egreso.eliminarEgreso(dato.id)
        }

        this.actualizarDatos()
    }

    actualizarDatos() {
        this.ingresos = Ingreso.obtenerIngresos();
        this.egresos = Egreso.obtenerEgresos();
        this.totalIngresos = Ingreso.obtenerTotal();
        this.totalEgresos = Egreso.obtenerTotal();

        this.mostrarPresupuesto()
    }

    agregarPorcentajes() {
        const totalIngresos = this.totalIngresos;
        const totalEgresos = this.totalEgresos;

        if (totalIngresos == 0) {
            let porcentajeTotal = 100
            document.querySelector(".cabecero-egreso-valor").innerHTML += `
            <div class="porcentaje-cabecera">
                %${porcentajeTotal.toFixed(2)}
            </div>`
        } else {
            let porcentajeTotal = (totalEgresos / totalIngresos) * 100;
            document.querySelector(".cabecero-egreso-valor").innerHTML += `
            <div class="porcentaje-cabecera">
                %${porcentajeTotal.toFixed(2)}
            </div>`
        }
    }

}