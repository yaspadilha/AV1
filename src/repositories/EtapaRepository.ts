import { BaseRepository } from "./BaseRepository";
import { Etapa } from "../models/Etapa";
import { Funcionario } from "../models/Funcionario";

export class EtapaRepository extends BaseRepository<Etapa> {

    constructor() {
        super("etapas");
    }

    cadastrar(etapa: Etapa): void {
        const etapas = this.lerDados();
        etapas.push(etapa);
        this.salvarDados(etapas);
    }

    iniciarEtapa(etapa: Etapa): void {
        etapa.statusEtapa = "Em andamento";
    }

    finalizarEtapa(etapa: Etapa): void {
        etapa.statusEtapa = "Concluído";
    }

    associarFuncionario(funcionario: Funcionario, etapa: Etapa): void {
        const funcionariosAssociados = etapa.funcionarios;
        funcionariosAssociados.push(funcionario);
    }

    listarFuncionariosAssociados(etapa: Etapa): void {
        const listaFuncionarios = etapa.funcionarios;
        for (let i = 0; i < listaFuncionarios.length; i++) {
            console.log(`${i + 1} - ${listaFuncionarios[i]!.nome}`);
        }
    }
}