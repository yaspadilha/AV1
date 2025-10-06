import { BaseRepository } from "./BaseRepository";
import { Funcionario } from "../models/Funcionario";
import { nivelPermissao } from "../models/enums";

export class FuncionarioRepository extends BaseRepository<Funcionario> {
    constructor() {
        super("funcionarios");
    }

    cadastrarFuncionario(nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: nivelPermissao): void {
        const id = this.gerarProximoId();
        const novoFuncionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivelPermissao);
        const banco = this.lerDados();
        banco.push(novoFuncionario);
        this.salvarDados(banco);
    }

    autenticarUsuario(usuario: string, senha: string): Funcionario | null {
        const funcionarios = this.lerDados();
        const funcionario = funcionarios.find(f => f.usuario === usuario && f.senha === senha);
        
        return funcionario || null;
    }

    login(usuario: string, senha: string): Funcionario | null {
        const funcionario = this.autenticarUsuario(usuario, senha);
        if (!funcionario) {
            console.log("Credenciais invalidas");
            return null;
        }
        return funcionario;
    }

    buscarPorId(id: number): Funcionario | undefined {
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