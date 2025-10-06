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
exports.FuncionarioController = void 0;
const readline = __importStar(require("readline-sync"));
const FuncionarioRepository_1 = require("../repositories/FuncionarioRepository");
class FuncionarioController {
    constructor() {
        this.repo = new FuncionarioRepository_1.FuncionarioRepository();
    }
    cadastrarUsuario() {
        const nome = readline.question("Nome: ");
        const telefone = readline.question("Telefone: ");
        const endereco = readline.question("Endereço: ");
        const usuario = readline.question("Nome de usuário: ");
        const senha = readline.question("Senha: ", { hideEchoBack: true });
        console.log("Nível de permissão:");
        console.log("1 - Administrador");
        console.log("2 - Engenheiro");
        console.log("3 - Operador");
        const permissaoNum = parseInt(readline.question("Opção: "));
        let nivelPermissao;
        switch (permissaoNum) {
            case 1:
                nivelPermissao = "Administrador";
                break;
            case 2:
                nivelPermissao = "Engenheiro";
                break;
            case 3:
                nivelPermissao = "Operador";
                break;
            default:
                console.log("Opcao invalida.");
                return;
        }
        this.repo.cadastrarFuncionario(nome, telefone, endereco, usuario, senha, nivelPermissao);
        console.log("Funcionário cadastrado com sucesso!");
    }
    login() {
        const usuario = readline.question("Digite o nome de usuário: ");
        const senha = readline.question("Digite a senha: ");
        return this.repo.login(usuario, senha);
    }
    listar() {
        this.repo.listarFuncionarios();
    }
}
exports.FuncionarioController = FuncionarioController;
