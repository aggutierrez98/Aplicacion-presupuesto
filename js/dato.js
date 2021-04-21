class Dato {
    constructor(nombre, valor) {
        this._nombre = nombre;
        this._valor = valor;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }

    get valor() {
        return this._valor;
    }

    set valor(valor) {
        this._valor = valor;
    }
}