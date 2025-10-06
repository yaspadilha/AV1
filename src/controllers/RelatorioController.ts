import * as readline from 'readline-sync';
import { AeronaveRepository } from "../repositories/AeronaveRepository";
import { Relatorio } from '../models/Relatorio';
import { RelatorioRepository } from '../repositories/RelatorioRepository';

export class RelatorioController {
    private aeronaveRepo = new AeronaveRepository();

    gerarRelatorioFinal() {
        const codigoAeronave = readline.question("Informe o código da aeronave para gerar o relatorio: ");
        const aeronave = this.aeronaveRepo.buscarPorCodigo(codigoAeronave);

        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }

        const cliente = readline.question("Nome do cliente: ");
        const data = new Date().toLocaleDateString('pt-BR');
        
        const relatorioModel = new Relatorio();
        const conteudoRelatorio = relatorioModel.gerarRelatorio(aeronave, cliente, data);
        
        console.log(conteudoRelatorio);

        const nomeArquivo = `relatorio_${aeronave.codigo}.txt`;
        const relatorioRepo = new RelatorioRepository(nomeArquivo);
        relatorioRepo.salvar(conteudoRelatorio);
    }
}