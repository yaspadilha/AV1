import * as readline from 'readline-sync';
import { PecaRepository } from '../repositories/PecaRepository';
import { AeronaveRepository } from '../repositories/AeronaveRepository';
import { Peca } from '../models/Peca';
import { tipoPeca, statusPeca } from '../models/enums';

export class PecaController {
    private pecaRepo = new PecaRepository();
    private aeronaveRepo = new AeronaveRepository();

    adicionarPecaAAeronave() {
        const codigoAeronave = readline.question("Informe o código da aeronave: ");
        const aeronave = this.aeronaveRepo.buscarPorCodigo(codigoAeronave);

        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }

        const id = this.pecaRepo.gerarProximoId();
        const nome = readline.question("Nome da peca: ");
        const tipo = readline.question("Tipo (Nacional/Importada): ") as tipoPeca;
        const fornecedor = readline.question("Fornecedor: ");
        const status = "Pronta para uso" as statusPeca;
        const novaPeca = new Peca(id, nome, tipo, fornecedor, status);
        
        this.pecaRepo.cadastrar(novaPeca);
        aeronave.pecas.push(novaPeca);

        const todasAeronaves = this.aeronaveRepo.lerDados();
        const index = todasAeronaves.findIndex(a => a.codigo === codigoAeronave);
        if (index !== -1) {
            todasAeronaves[index] = aeronave;
            this.aeronaveRepo.salvarDados(todasAeronaves);
            console.log("Peca adicionada com sucesso a aeronave!");
        }
    }

    listarTodasAsPecas() {
        const pecas = this.pecaRepo.lerDados();
        if (pecas.length === 0) {
            console.log("Nenhuma peca cadastrada no sistema.");
            return;
        }

        console.log("\n--- Pecas Cadastradas ---");
        pecas.forEach(p => {
            console.log(`ID: ${p.id} | Nome: ${p.nome} | Status Atual: ${p.statusPeca}`);
        });
        console.log("------------------------------------");
    }

    atualizarStatusPeca() {
        this.listarTodasAsPecas();
        const pecas = this.pecaRepo.lerDados();
        if (pecas.length === 0) return;

        const id = readline.questionInt("Digite o ID da peca que deseja atualizar: ");
        const peca = this.pecaRepo.lerDados().find(p => p.id === id);

        if (!peca) {
            console.log("Peca não encontrada.");
            return;
        }

        const statusDisponiveis: statusPeca[] = ["Em produção", "Em transporte", "Pronta para uso"];
        const index = readline.keyInSelect(statusDisponiveis, `Selecione o novo status para '${peca.nome}':`);

        if (index === -1) {
            console.log("Operação cancelada.");
            return;
        }
        
        const novoStatus = statusDisponiveis[index];
        this.pecaRepo.atualizarStatus(id, novoStatus);
        const todasAeronaves = this.aeronaveRepo.lerDados();

        todasAeronaves.forEach(aeronave => {
            const pecaNaAeronave = aeronave.pecas.find(p => p.id === id);
            if (pecaNaAeronave) {
                pecaNaAeronave.statusPeca = novoStatus;
            }
        });
        this.aeronaveRepo.salvarDados(todasAeronaves);

        console.log("Status da peca atualizado com sucesso!");
    }
}