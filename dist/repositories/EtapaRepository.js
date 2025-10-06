"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtapaRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
class EtapaRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super("etapas");
    }
    cadastrar(etapa) {
        const etapas = this.lerDados();
        etapas.push(etapa);
        this.salvarDados(etapas);
    }
    iniciarEtapa(etapa) {
        etapa.statusEtapa = "Em andamento";
    }
    finalizarEtapa(etapa) {
        etapa.statusEtapa = "Concluído";
    }
    associarFuncionario(funcionario, etapa) {
        const funcionariosAssociados = etapa.funcionarios;
        funcionariosAssociados.push(funcionario);
    }
    listarFuncionariosAssociados(etapa) {
        const listaFuncionarios = etapa.funcionarios;
        for (let i = 0; i < listaFuncionarios.length; i++) {
            console.log(`${i + 1} - ${listaFuncionarios[i].nome}`);
        }
    }
}
exports.EtapaRepository = EtapaRepository;
