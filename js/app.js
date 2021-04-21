let ingresos = [
    new Ingreso("Salario", 2100),
    new Ingreso("Venta coche", 1500)
];
let egresos = [
    new Egreso("Renta departamento", 900),
    new Egreso("Ropa", 400)
];

function formatoMoneda(valor) {
    return valor.toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 })
}

function mostrarPresupuesto() {
    let totalEgresos = mostrarEgresos();
    let totalIngresos = mostrarIngresos();
    let total = (totalIngresos) - totalEgresos;

    document.querySelector(".cabecero-valor").innerHTML = `<h1>${formatoMoneda(total)}</h1>`
    agregarPorcentajes(totalEgresos, totalIngresos)
}

function agregarPorcentajes(totalEgresos, totalIngresos) {
    if (totalIngresos == 0) {
        let porcentajeTotal = 100
        document.querySelector(".cabecero-egreso-valor").innerHTML += `<div class="porcentaje-cabecera">%${porcentajeTotal.toFixed(2)}</div>`
    } else {
        let porcentajeTotal = (totalEgresos / totalIngresos) * 100;
        document.querySelector(".cabecero-egreso-valor").innerHTML += `<div class="porcentaje-cabecera">%${porcentajeTotal.toFixed(2)}</div>`
    }

}

function mostrarIngresos() {
    let totalIngresos = 0;
    document.querySelector(".abajo-ingreso-valor").innerHTML = "";
    for (let ingreso of ingresos) {
        totalIngresos += ingreso.valor;
        document.querySelector(".abajo-ingreso-valor").innerHTML += `<div class="valores-ingreso"><p>${ingreso.nombre}</p><div class="valores-in"> <p>${formatoMoneda(ingreso.valor)}</p><button class="btn" onclick="eliminarIngreso(${ingreso.id})">
        <ion-icon name="close-circle-outline"></ion-icon>
    </button></div></div>`
    }
    document.querySelector(".cabecero-ingreso-valor").innerHTML = `${formatoMoneda(totalIngresos)}`
    return totalIngresos;
}

function mostrarEgresos() {
    let totalEgresos = 0;
    document.querySelector(".abajo-egreso-valor").innerHTML = "";
    let porcentaje = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    for (let egreso of egresos) {
        porcentaje = (egreso.valor / totalEgresos) * 100;
        document.querySelector(".abajo-egreso-valor").innerHTML += `<div class="valores-egreso"><p>${egreso.nombre}</p><div class="valores-eg"> <p>-${formatoMoneda(egreso.valor)}</p> <div class="porcentaje"> %${porcentaje.toFixed(2)}</div><button class="btn" onclick="eliminarEgreso(${egreso.id})">
        <ion-icon name="close-circle-outline"></ion-icon>
    </button></div></div>`
    }
    document.querySelector(".cabecero-egreso-valor").innerHTML = `-${formatoMoneda(totalEgresos)}`
    return totalEgresos;
}

function agregarDato() {
    let formulario = document.forms["forma"]
    let tipo = formulario["operando"];
    let descripcion = formulario["descripcion"];
    let valor = formulario["valor"];
    if (descripcion.value !== "" && valor.value !== "") {
        if (tipo.value === "ingreso") {
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
        } else if (tipo.value === "egreso") {
            egresos.push(new Egreso(descripcion.value, +valor.value));
        }
        mostrarPresupuesto();
    }
}

function eliminarIngreso(id) {
    let indice = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indice, 1);
    mostrarPresupuesto();
}

function eliminarEgreso(id) {
    let indice = egresos.findIndex(ingreso => ingreso.id === id);
    egresos.splice(indice, 1);
    mostrarPresupuesto();
}



const addCart = (e) => {
    if (e.target.classList.contains("btn")) {
        const index = searchProduct(e.target.name, productos);

        if (index != null) {
            const exist = searchProduct(e.target.name, cart);

            if (exist == null) {
                cart.push(productos[index]);
                drawMiniChar();
                msgSuccess();
            } else {
                msgError("Ya compraste este producto");
            }
        } else {
            msgError("Error, no se encontro el producto!");
        }
    }
}

function searchProduct(productName, searchArray) {
    let index = searchArray.length;
    let i = 0;

    while (index == searchArray.length && i < searchArray.length) {
        if (searchArray[i].nombre == productName) {
            index = i;
        }
        i++;
    }

    if (index != searchArray.length) {
        return index;
    } else {
        return null;
    }
}