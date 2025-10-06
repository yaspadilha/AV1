import { Funcionario } from "./Funcionario"; 
import { statusEtapa } from "./enums";

export class Etapa {
    id: number;
    nome: string;
    prazo: string;
    statusEtapa: statusEtapa;
    funcionarios: Array<Funcionario>;

    constructor(id: number, nome: string, prazo: string, statusEtapa: statusEtapa, funcionarios: Array<Funcionario>) {
        this.id = id;
        this.nome = nome;
        this.prazo = prazo;
        this.statusEtapa = statusEtapa;
        this.funcionarios = funcionarios;
    }
}