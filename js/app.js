const incomesData = JSON.parse(localStorage.getItem("incomes-data") ?? "[]");
const outcomesData = JSON.parse(localStorage.getItem("outcomes-data") ?? "[]");
const incomes = incomesData.map(income => new Ingreso(income._nombre, income._valor))
const outcomes = outcomesData.map(outcome => new Egreso(outcome._nombre, outcome._valor))

function formatoMoneda(valor) {
    return valor.toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 })
}

function mostrarPresupuesto() {
    let totalIngresos = mostrarIngresos();
    let totalEgresos = mostrarEgresos();
    let total = (totalIngresos) - totalEgresos;

    document.querySelector(".cabecero-valor").innerHTML = `<h1>${formatoMoneda(total)}</h1>`
    agregarPorcentajes(totalEgresos, totalIngresos)
}

function agregarPorcentajes(totalEgresos, totalIngresos) {
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

function mostrarIngresos() {
    let totalIngresos = 0;
    const ingresos = document.querySelector(".abajo-ingreso-valor");
    ingresos.innerHTML = "";

    for (let ingreso of incomes) {
        totalIngresos += ingreso.valor;
        ingresos.innerHTML += `
        <div class="valores-ingreso">
            <p>${ingreso.nombre}</p>
            <div class="valores-in"> 
                <p>${formatoMoneda(ingreso.valor)}</p>
                <button class="btn" onclick="eliminarIngreso(${ingreso.id})">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>`
    }

    document.querySelector(".cabecero-ingreso-valor").innerHTML = `${formatoMoneda(totalIngresos)}`

    if (incomes.length === 0) {
        ingresos.classList.add("sin-ingresos")
        ingresos.setAttribute('data-text', 'No incomes');
    } else {
        ingresos.classList.remove("sin-ingresos");
    }
    return totalIngresos;
}

function mostrarEgresos() {
    let totalEgresos = 0;
    const egresos = document.querySelector(".abajo-egreso-valor")
    egresos.innerHTML = "";
    let porcentaje = 0;
    for (let egreso of outcomes) {
        totalEgresos += egreso.valor;
    }
    for (let egreso of outcomes) {
        porcentaje = (egreso.valor / totalEgresos) * 100;
        egresos.innerHTML += `
        <div class="valores-egreso">
            <p>${egreso.nombre}</p>
            <div class="valores-eg"> 
                <p>-${formatoMoneda(egreso.valor)}</p> 
                <div class="porcentaje"> 
                    %${porcentaje.toFixed(2)}
                </div>
                <button class="btn" onclick="eliminarEgreso(${egreso.id})">
                <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>`
    }
    document.querySelector(".cabecero-egreso-valor").innerHTML = `-${formatoMoneda(totalEgresos)}`

    if (outcomes.length === 0) {
        egresos.classList.add("sin-egresos")
        egresos.setAttribute('data-text', 'No outcomes');
    } else {
        egresos.classList.remove("sin-egresos")
    }

    return totalEgresos;
}

function agregarDato() {
    let formulario = document.forms["forma"]
    let tipo = formulario["operando"];
    let descripcion = formulario["descripcion"];
    let valor = formulario["valor"];
    if (descripcion.value !== "" && valor.value !== "") {
        if (tipo.value === "ingreso") {
            incomes.push(new Ingreso(descripcion.value, +valor.value));
        } else if (tipo.value === "egreso") {
            outcomes.push(new Egreso(descripcion.value, +valor.value));
        }
        mostrarPresupuesto();
        actualizarLocalStorage();
    }
}

function eliminarIngreso(id) {
    let indice = incomes.findIndex(ingreso => ingreso.id === id);
    incomes.splice(indice, 1);
    mostrarPresupuesto();
    actualizarLocalStorage()
}

function eliminarEgreso(id) {
    let indice = outcomes.findIndex(ingreso => ingreso.id === id);
    outcomes.splice(indice, 1);
    mostrarPresupuesto();
    actualizarLocalStorage()
}

function actualizarLocalStorage() {
    const incomesData = JSON.stringify(incomes);
    const outomcesData = JSON.stringify(outcomes);
    localStorage.setItem("incomes-data", incomesData)
    localStorage.setItem("outcomes-data", outomcesData)
}