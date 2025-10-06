"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aeronave = void 0;
class Aeronave {
    constructor(codigo, modelo, tipoAeronave, capacidade, alcance) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipoAeronave = tipoAeronave;
        this.capacidade = capacidade;
        this.alcance = alcance;
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
    }
}
exports.Aeronave = Aeronave;
