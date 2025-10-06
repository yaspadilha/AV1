import * as readline from 'readline-sync';
import { AeronaveController } from './controllers/AeronaveController';
import { FuncionarioController } from './controllers/FuncionarioController';
import { PecaController } from './controllers/PecaController';
import { RelatorioController } from './controllers/RelatorioController';
import { EtapaController } from './controllers/EtapaController';
import { TesteController } from './controllers/TesteController';
import { Funcionario } from './models/Funcionario';

const aeronaveController = new AeronaveController();
const funcionarioController = new FuncionarioController();
const pecaController = new PecaController();
const relatorioController = new RelatorioController();
const etapaController = new EtapaController();
const testeController = new TesteController();

let usuarioLogado: Funcionario | null = null;

function menuPrincipal() {
    let execucao = true;
    while (execucao) {
        console.log('\n--- MENU PRINCIPAL ---');
        console.log('1 - Gerenciar aeronaves');
        console.log('2 - Gerenciar pecas');
        console.log('3 - Gerenciar etapas de producao');
        console.log('4 - Gerenciar testes da aeronave');
        console.log('5 - Gerar relatório');

        if (usuarioLogado?.nivelPermissao === "Administrador") {
            console.log('6 - Listar Funcionários');
        }
        
        console.log('0 - Sair');
        
        const opcao = readline.questionInt('Selecione uma opcao: ');

        switch (opcao) {
            case 1: menuGerenciarAeronaves(); break;
            case 2: menuGerenciarPecas(); break;
            case 3: menuGerenciarEtapas(); break;
            case 4: menuGerenciarTestes(); break;
            case 5: relatorioController.gerarRelatorioFinal(); break;
            case 6:
                 if (usuarioLogado?.nivelPermissao === "Administrador") {
                    funcionarioController.listar();
                } else {
                    console.log("Você nao tem permissao para acessar essa área.");
                }
                break;
            case 0:
                execucao = false;
                usuarioLogado = null; 
                console.log('Fechando programa...');
                break;
            default:
                console.log('Opcao inválida!');
        }
    }
}

function menuGerenciarPecas() {
    let execucao = true;
    while(execucao) {
        console.log('\n--- GERENCIAR PECAS ---');
        console.log('1 - Adicionar nova peca a uma aeronave');
        console.log('2 - Listar pecas');
        console.log('3 - Atualizar status de uma peca');
        console.log('0 - Voltar ao menu principal');
        
        const opcao = readline.questionInt('Selecione uma opcao: ');

        switch (opcao) {
            case 1: pecaController.adicionarPecaAAeronave(); break;
            case 2: pecaController.listarTodasAsPecas(); break;
            case 3: pecaController.atualizarStatusPeca(); break;
            case 0: execucao = false; break;
            default: console.log('Opcao inválida! Tente novamente.');
        }
    }
}

function menuGerenciarEtapas() {
    let execucao = true;
    while(execucao) {
        console.log('\n--- GERENCIAR ETAPAS DE PRODUCAO ---');
        console.log('1 - Cadastrar nova etapa');
        console.log('2 - Listar etapas');
        console.log('3 - Iniciar uma etapa');
        console.log('4 - Finalizar uma etapa');
        console.log('5 - Associar funcionário a uma etapa');
        console.log('6 - Listar funcionários de uma etapa');
        console.log('0 - Voltar ao menu principal');
        
        const opcao = readline.questionInt('Selecione uma opcao: ');

        switch (opcao) {
            case 1: etapaController.cadastrarEtapaParaAeronave(); break;
            case 2: etapaController.listarEtapasDeAeronave(); break;
            case 3: etapaController.iniciarEtapa(); break;
            case 4: etapaController.finalizarEtapa(); break;
            case 5: etapaController.associarFuncionarioAEtapa(); break;
            case 6: etapaController.listarFuncionariosDeEtapa(); break;
            case 0: execucao = false; break;
            default: console.log('Opcao inválida! Tente novamente.');
        }
    }
}

function menuGerenciarAeronaves() {
    let execucao = true;
    while(execucao) {
        console.log('\n--- GERENCIAR AERONAVES ---');
        console.log('1 - Cadastrar nova aeronave');
        console.log('2 - Listar todas as aeronaves');
        console.log('3 - Ver detalhes de uma aeronave');
        console.log('0 - Voltar ao menu principal');
        
        const opcao = readline.questionInt('Selecione uma opcao: ');

        switch (opcao) {
            case 1:
                aeronaveController.registrarAeronave();
                break;
            case 2:
                aeronaveController.listarAeronaves();
                break;
            case 3:
                aeronaveController.apresentarDados();
                break;
            case 0:
                execucao = false;
                break;
            default:
                console.log('Opcao inválida! Tente novamente.');
        }
    }
}

function menuGerenciarTestes() {
    let execucao = true;
    while(execucao) {
        console.log('\n--- GERENCIAR TESTES DA AERONAVE ---');
        console.log('1 - Registrar novo teste');
        console.log('2 - Listar testes');
        console.log('0 - Voltar ao menu principal');

        const opcao = readline.questionInt('Selecione uma opcao: ');

        switch (opcao) {
            case 1:
                testeController.registrarTesteParaAeronave();
                break;
            case 2:
                testeController.listarTestesDeAeronave();
                break;
            case 0:
                execucao = false;
                break;
            default:
                console.log('Opcao inválida! Tente novamente.');
        }
    }
}

function inicio() {
    console.log('=====================================');
    console.log('  Bem-vindo à AeroCode ');
    console.log('=====================================');

    let execucao = true;
    while (execucao) {
        console.log('\n--- TELA INICIAL ---');
        console.log('1 - Login');
        console.log('2 - Cadastrar novo funcionário');
        console.log('0 - Sair do Sistema');

        const opcao = readline.questionInt('Selecione uma opcao: ');

        switch (opcao) {
            case 1:
                usuarioLogado = funcionarioController.login();
                if (usuarioLogado) {
                    menuPrincipal();
                }
                break;
            case 2:
                funcionarioController.cadastrarUsuario();
                break;
            case 0:
                execucao = false;
                console.log('Encerrando o programa...');
                break;
            default:
                console.log('Opcao inválida! Tente novamente.');
        }
    }
}

inicio();