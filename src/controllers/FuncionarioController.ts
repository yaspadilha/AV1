import * as readline from 'readline-sync';
import { FuncionarioRepository } from "../repositories/FuncionarioRepository";
import { nivelPermissao } from "../models/enums";
import { Funcionario } from '../models/Funcionario';


export class FuncionarioController {
    private repo = new FuncionarioRepository();

    cadastrarUsuario() {
        const nome = readline.question("Nome: ");
        const telefone = readline.question("Telefone: ");
        const endereco = readline.question("Endereço: ");
        const usuario = readline.question("Nome de usuário: ");
        const senha = readline.question("Senha: ");
        
        console.log("Nível de permissão:");
        console.log("1 - Administrador");
        console.log("2 - Engenheiro");
        console.log("3 - Operador");
        const permissaoNum = parseInt(readline.question("Opção: "));

        let nivelPermissao: nivelPermissao;
        switch(permissaoNum) {
            case 1: nivelPermissao = "Administrador"; break;
            case 2: nivelPermissao = "Engenheiro"; break;
            case 3: nivelPermissao = "Operador"; break;
            default: console.log("Opcao invalida."); return;
        }

        this.repo.cadastrarFuncionario(nome, telefone, endereco, usuario, senha, nivelPermissao);
        console.log("Funcionário cadastrado com sucesso!");
    }

    login(): Funcionario | null {
        const usuario = readline.question("Digite o nome de usuário: ");
        const senha = readline.question("Digite a senha: ");

        return this.repo.login(usuario, senha);
    }

    listar () {
        this.repo.listarFuncionarios();
    }
}