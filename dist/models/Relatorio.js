"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relatorio = void 0;
class Relatorio {
    gerarRelatorio(aeronave, cliente, dataEntrega) {
        let relatorio = `RELATÓRIO FINAL DA AERONAVE\n`;
        relatorio += `========================================\n`;
        relatorio += `Cliente: ${cliente}\n`;
        relatorio += `Data de Entrega: ${dataEntrega}\n`;
        relatorio += `----------------------------------------\n`;
        relatorio += `DADOS DA AERONAVE\n`;
        relatorio += `Código: ${aeronave.codigo}\n`;
        relatorio += `Modelo: ${aeronave.modelo}\n`;
        relatorio += `Tipo: ${aeronave.tipoAeronave}\n`;
        relatorio += `Capacidade: ${aeronave.capacidade} passageiros\n`;
        relatorio += `Alcance: ${aeronave.alcance} km\n`;
        relatorio += `----------------------------------------\n`;
        relatorio += `PEÇAS UTILIZADAS\n`;
        if (aeronave.pecas && aeronave.pecas.length > 0) {
            aeronave.pecas.forEach(peca => {
                relatorio += `- ${peca.nome} (${peca.tipoPeca}) - Fornecedor: ${peca.fornecedor}\n`;
            });
        }
        else {
            relatorio += `Nenhuma peça registrada.\n`;
        }
        relatorio += `----------------------------------------\n`;
        relatorio += `ETAPAS DE PRODUÇÃO\n`;
        if (aeronave.etapas && aeronave.etapas.length > 0) {
            aeronave.etapas.forEach(etapa => {
                relatorio += `- ${etapa.nome} (Prazo: ${etapa.prazo}) - Status: ${etapa.statusEtapa}\n`;
            });
        }
        else {
            relatorio += `Nenhuma etapa registrada.\n`;
        }
        relatorio += `----------------------------------------\n`;
        relatorio += `RESULTADO DOS TESTES\n`;
        if (aeronave.testes && aeronave.testes.length > 0) {
            aeronave.testes.forEach(teste => {
                relatorio += `- Tipo: ${teste.tipoTeste} - Resultado: ${teste.resultado}\n`;
            });
        }
        else {
            relatorio += `Nenhum teste registrado.\n`;
        }
        relatorio += `========================================\n`;
        return relatorio;
    }
}
exports.Relatorio = Relatorio;
