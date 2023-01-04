export const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 })
}
