import { Peca } from './Peca';
import { Etapa } from './Etapa';
import { Teste } from './Teste';
import { tipoAeronave } from './enums';

export class Aeronave {
    codigo: string;
    modelo: string;
    tipoAeronave: tipoAeronave;
    capacidade: number;
    alcance: number;
    pecas: Peca[];
    etapas: Etapa[];
    testes: Teste[];

    constructor(codigo: string, modelo: string, tipoAeronave: tipoAeronave, capacidade: number, alcance: number) {
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