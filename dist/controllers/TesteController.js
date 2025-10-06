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
exports.TesteController = void 0;
const readline = __importStar(require("readline-sync"));
const AeronaveRepository_1 = require("../repositories/AeronaveRepository");
const Teste_1 = require("../models/Teste");
class TesteController {
    constructor() {
        this.aeronaveRepo = new AeronaveRepository_1.AeronaveRepository();
    }
    registrarTesteParaAeronave() {
        const codigoAeronave = readline.question("Informe o código da aeronave para registrar o teste: ");
        const aeronave = this.aeronaveRepo.buscarPorCodigo(codigoAeronave);
        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }
        console.log(`\n--- Registrando teste: ---`);
        const tiposDeTeste = ["Elétrico", "Hidráulico", "Aerodinâmico"];
        const indexTipo = readline.keyInSelect(tiposDeTeste, "Selecione o tipo de teste:");
        if (indexTipo === -1) {
            console.log("Operação cancelada.");
            return;
        }
        const tipo = tiposDeTeste[indexTipo];
        const resultadosDoTeste = ["Aprovado", "Reprovado"];
        const indexResultado = readline.keyInSelect(resultadosDoTeste, "Selecione o resultado do teste:");
        if (indexResultado === -1) {
            console.log("Operação cancelada.");
            return;
        }
        const resultado = resultadosDoTeste[indexResultado];
        const novoTeste = new Teste_1.Teste(tipo, resultado);
        aeronave.testes.push(novoTeste);
        const todasAeronaves = this.aeronaveRepo.lerDados();
        const indexAeronave = todasAeronaves.findIndex(a => a.codigo === codigoAeronave);
        if (indexAeronave !== -1) {
            todasAeronaves[indexAeronave] = aeronave;
            this.aeronaveRepo.salvarDados(todasAeronaves);
            console.log(`\nTeste registrado com sucesso!`);
        }
        else {
            console.log("Erro ao salvar o teste.");
        }
    }
    listarTestesDeAeronave() {
        const codigoAeronave = readline.question("Informe o código da aeronave: ");
        const aeronave = this.aeronaveRepo.buscarPorCodigo(codigoAeronave);
        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }
        console.log(`\n--- Testes da Aeronave: ${aeronave.modelo} (${aeronave.codigo}) ---`);
        if (aeronave.testes.length === 0) {
            console.log("Nenhum teste registrado nessa aeronave.");
        }
        else {
            aeronave.testes.forEach((teste, index) => {
                console.log(`${index + 1}. Tipo: ${teste.tipoTeste} | Resultado: ${teste.resultado}`);
            });
        }
        console.log("----------------------------------------------------");
    }
}
exports.TesteController = TesteController;
