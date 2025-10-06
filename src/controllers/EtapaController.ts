import * as readline from 'readline-sync';
import { EtapaRepository } from "../repositories/EtapaRepository";
import { AeronaveRepository } from '../repositories/AeronaveRepository';
import { FuncionarioRepository } from '../repositories/FuncionarioRepository';
import { Etapa } from '../models/Etapa';

export class EtapaController {
    private etapaRepo = new EtapaRepository();
    private aeronaveRepo = new AeronaveRepository();
    private funcionarioRepo = new FuncionarioRepository();
    
    cadastrarEtapaParaAeronave() {
        const codigoAeronave = readline.question("Informe o código da aeronave: ");
        const aeronave = this.aeronaveRepo.buscarPorCodigo(codigoAeronave);

        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }

        console.log(`\n--- Cadastrando nova etapa para a Aeronave ${aeronave.modelo} ---`);
        const nome = readline.question("Nome da etapa: ");
        const prazo = readline.question("Prazo para conclusao: ");

        const id = this.etapaRepo.gerarProximoId();
        const novaEtapa = new Etapa(id, nome, prazo, "Pendente", []);

        this.etapaRepo.cadastrar(novaEtapa);
        aeronave.etapas.push(novaEtapa);

        const todasAeronaves = this.aeronaveRepo.lerDados();
        const index = todasAeronaves.findIndex(a => a.codigo === codigoAeronave);
        if (index !== -1) {
            todasAeronaves[index] = aeronave;
            this.aeronaveRepo.salvarDados(todasAeronaves);
            console.log("\nEtapa cadastrada e associada a aeronave com sucesso!");
        } else {
            console.log("Erro ao tentar salvar a associação da etapa.");
        }
    }

    listarEtapasDeAeronave() {
        const codigoAeronave = readline.question("Informe o código da aeronave: ");
        const aeronave = this.aeronaveRepo.buscarPorCodigo(codigoAeronave);

        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }

        console.log(`\n--- Etapas da Aeronave: ${aeronave.modelo} (${aeronave.codigo}) ---`);
        if (aeronave.etapas.length === 0) {
            console.log("Nenhuma etapa cadastrada para esta aeronave.");
        } else {
            aeronave.etapas.forEach(etapa => {
                console.log(`ID: ${etapa.id} | Nome: ${etapa.nome} | Prazo: ${etapa.prazo} | Status: ${etapa.statusEtapa}`);
            });
        }
        console.log("----------------------------------------------------");
    }

    iniciarEtapa() {
        const todasAeronaves = this.aeronaveRepo.lerDados();
        const codigo = readline.question("Informe o código da aeronave: ");
        const aeronave = todasAeronaves.find(a => a.codigo === codigo);

        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }

        const etapasPendentes = aeronave.etapas.filter(e => e.statusEtapa === "Pendente");
        if (etapasPendentes.length === 0) {
            console.log("Nenhuma etapa pendente para iniciar.");
            return;
        }

        const nomesEtapas = etapasPendentes.map(e => `ID ${e.id}: ${e.nome}`);
        const index = readline.keyInSelect(nomesEtapas, "Qual etapa iniciar?");
        if (index === -1) {
            console.log("Operação cancelada.");
            return;
        }

        const etapaSelecionada = etapasPendentes[index];
        const indexGlobal = aeronave.etapas.findIndex(e => e.id === etapaSelecionada.id);

        if (indexGlobal > 0) {
            const etapaAnterior = aeronave.etapas[indexGlobal - 1];
            if (etapaAnterior && etapaAnterior.statusEtapa !== "Concluído") {
                console.log(`Erro: A etapa anterior ('${etapaAnterior.nome}') ainda não foi concluída.`);
                return;
            }
        }

        etapaSelecionada.statusEtapa = "Em andamento";
        this.aeronaveRepo.salvarDados(todasAeronaves);
        console.log(`Etapa '${etapaSelecionada.nome}' iniciada com sucesso!`);
    }

    finalizarEtapa() {
        const todasAeronaves = this.aeronaveRepo.lerDados();
        const codigo = readline.question("Informe o código da aeronave: ");
        const aeronave = todasAeronaves.find(a => a.codigo === codigo);

        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }
        
        const etapasEmAndamento = aeronave.etapas.filter(e => e.statusEtapa === "Em andamento");
        if (etapasEmAndamento.length === 0) {
            console.log("Nenhuma etapa em andamento.");
            return;
        }
        
        const nomesEtapas = etapasEmAndamento.map(e => `ID ${e.id}: ${e.nome}`);
        const index = readline.keyInSelect(nomesEtapas, "Qual etapa finalizar?");
        if (index === -1) {
            console.log("Operação cancelada.");
            return;
        }

        const etapaSelecionada = etapasEmAndamento[index];
        etapaSelecionada.statusEtapa = "Concluído";
        this.aeronaveRepo.salvarDados(todasAeronaves);
        console.log(`Etapa '${etapaSelecionada.nome}' finalizada com sucesso!`);
    }

    associarFuncionarioAEtapa() {
        const todasAeronaves = this.aeronaveRepo.lerDados();
        const codigo = readline.question("Informe o código da aeronave: ");
        const aeronave = todasAeronaves.find(a => a.codigo === codigo);

        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }
        
        const nomesEtapas = aeronave.etapas.map(e => `ID ${e.id}: ${e.nome}`);
        const indexEtapa = readline.keyInSelect(nomesEtapas, "Associar funcionário a qual etapa?");
        if (indexEtapa === -1) {
            console.log("Operação cancelada.");
            return;
        }
        const etapaSelecionada = aeronave.etapas[indexEtapa];
        
        this.funcionarioRepo.listarFuncionarios();
        const idFuncionario = readline.questionInt("Digite o ID do funcionário: ");
        const funcionario = this.funcionarioRepo.buscarPorId(idFuncionario);
        
        if (!funcionario) {
            console.log("Funcionário não encontrado.");
            return;
        }

        if (etapaSelecionada.funcionarios.some(f => f.id === idFuncionario)) {
            console.log("Este funcionário ja esta associado a esta etapa.");
            return;
        }

        etapaSelecionada.funcionarios.push(funcionario);
        this.aeronaveRepo.salvarDados(todasAeronaves);
        console.log(`Funcionário ${funcionario.nome} associado a etapa '${etapaSelecionada.nome}' com sucesso.`);
    }

    listarFuncionariosDeEtapa() {
        const aeronave = this.aeronaveRepo.buscarPorCodigo(readline.question("Informe o código da aeronave: "));
        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }
        
        const nomesEtapas = aeronave.etapas.map(e => `ID ${e.id}: ${e.nome}`);
        const indexEtapa = readline.keyInSelect(nomesEtapas, "Ver funcionários de qual etapa?");
        if (indexEtapa === -1) {
            console.log("Operação cancelada.");
            return;
        }
        const etapaSelecionada = aeronave.etapas[indexEtapa];

        console.log(`\n--- Funcionários da Etapa: ${etapaSelecionada.nome} ---`);
        if (etapaSelecionada.funcionarios.length === 0) {
            console.log("Nenhum funcionário associado a essa etapa.");
        } else {
            etapaSelecionada.funcionarios.forEach(f => console.log(`- ${f.nome} (ID: ${f.id})`));
        }
        console.log("-----------------------------------------------");
    }
}