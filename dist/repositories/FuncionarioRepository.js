"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Funcionario_1 = require("../models/Funcionario");
class FuncionarioRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super("funcionarios");
    }
    cadastrarFuncionario(nome, telefone, endereco, usuario, senha, nivelPermissao) {
        const id = this.gerarProximoId();
        const novoFuncionario = new Funcionario_1.Funcionario(id, nome, telefone, endereco, usuario, senha, nivelPermissao);
        const banco = this.lerDados();
        banco.push(novoFuncionario);
        this.salvarDados(banco);
    }
    autenticarUsuario(usuario, senha) {
        const funcionarios = this.lerDados();
        const funcionario = funcionarios.find(f => f.usuario === usuario && f.senha === senha);
        return funcionario || null;
    }
    login(usuario, senha) {
        const funcionario = this.autenticarUsuario(usuario, senha);
        if (!funcionario) {
            console.log("Credenciais invalidas");
            return null;
        }
        return funcionario;
    }
    buscarPorId(id) {
        const funcionarios = this.lerDados();
        return funcionarios.find(f => f.id === id);
    }
    listarFuncionarios() {
        const lista = this.lerDados();
        console.log("\n--- Lista de Funcionários ---");
        lista.forEach(f => {
            console.log(`ID: ${f.id} | Nome: ${f.nome} | Usuário: ${f.usuario} | Permissão: ${f.nivelPermissao}`);
        });
        console.log("-----------------------------\n");
    }
}
exports.FuncionarioRepository = FuncionarioRepository;
