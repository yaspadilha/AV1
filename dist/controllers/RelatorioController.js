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
exports.RelatorioController = void 0;
const readline = __importStar(require("readline-sync"));
const AeronaveRepository_1 = require("../repositories/AeronaveRepository");
const Relatorio_1 = require("../models/Relatorio");
const RelatorioRepository_1 = require("../repositories/RelatorioRepository");
class RelatorioController {
    constructor() {
        this.aeronaveRepo = new AeronaveRepository_1.AeronaveRepository();
    }
    gerarRelatorioFinal() {
        const codigoAeronave = readline.question("Informe o código da aeronave para gerar o relatorio: ");
        const aeronave = this.aeronaveRepo.buscarPorCodigo(codigoAeronave);
        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }
        const cliente = readline.question("Nome do cliente: ");
        const data = new Date().toLocaleDateString('pt-BR');
        const relatorioModel = new Relatorio_1.Relatorio();
        const conteudoRelatorio = relatorioModel.gerarRelatorio(aeronave, cliente, data);
        console.log(conteudoRelatorio);
        const nomeArquivo = `relatorio_${aeronave.codigo}.txt`;
        const relatorioRepo = new RelatorioRepository_1.RelatorioRepository(nomeArquivo);
        relatorioRepo.salvar(conteudoRelatorio);
    }
}
exports.RelatorioController = RelatorioController;
