import * as readline from 'readline-sync';
import { tipoAeronave } from '../models/enums';
import { AeronaveRepository } from "../repositories/AeronaveRepository";

export class AeronaveController {
    private repo = new AeronaveRepository();

    registrarAeronave() {
        const codigo = readline.question("Código: ");
        const modelo = readline.question("Modelo: ");
        const tipo = readline.question("Tipo (Comercial/Militar): ") as tipoAeronave;
        const capacidade = parseInt(readline.question("Capacidade: "));
        const alcance = parseInt(readline.question("Alcance: "));

        this.repo.registrarAeronave(codigo, modelo, tipo, capacidade, alcance);
    }

    apresentarDados() {
        const codigo = readline.question("Informe o código da aeronave: ")
        this.repo.mostrarDetalhes(codigo);
    }

    listarAeronaves() {
        this.repo.listarAeronaves();
    }
}