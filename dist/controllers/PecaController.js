"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PecaController = void 0;
const readline = __importStar(require("readline-sync"));
const PecaRepository_1 = require("../repositories/PecaRepository");
const AeronaveRepository_1 = require("../repositories/AeronaveRepository");
const Peca_1 = require("../models/Peca");
class PecaController {
    constructor() {
        this.pecaRepo = new PecaRepository_1.PecaRepository();
        this.aeronaveRepo = new AeronaveRepository_1.AeronaveRepository();
    }
    adicionarPecaAAeronave() {
        const codigoAeronave = readline.question("Informe o código da aeronave: ");
        const aeronave = this.aeronaveRepo.buscarPorCodigo(codigoAeronave);
        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }
        const id = this.pecaRepo.gerarProximoId();
        const nome = readline.question("Nome da peca: ");
        const tipo = readline.question("Tipo (Nacional/Importada): ");
        const fornecedor = readline.question("Fornecedor: ");
        const status = "Pronta para uso";
        const novaPeca = new Peca_1.Peca(id, nome, tipo, fornecedor, status);
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
        if (pecas.length === 0)
            return;
        const id = readline.questionInt("Digite o ID da peca que deseja atualizar: ");
        const peca = this.pecaRepo.lerDados().find(p => p.id === id);
        if (!peca) {
            console.log("Peca não encontrada.");
            return;
        }
        const statusDisponiveis = ["Em produção", "Em transporte", "Pronta para uso"];
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
exports.PecaController = PecaController;
