import * as readline from 'readline-sync';
import { AeronaveRepository } from '../repositories/AeronaveRepository';
import { Teste } from '../models/Teste';
import { tipoTeste, resultadoTeste } from '../models/enums';

export class TesteController {
    private aeronaveRepo = new AeronaveRepository();

    registrarTesteParaAeronave() {
        const codigoAeronave = readline.question("Informe o código da aeronave para registrar o teste: ");
        const aeronave = this.aeronaveRepo.buscarPorCodigo(codigoAeronave);

        if (!aeronave) {
            console.log("Aeronave não encontrada.");
            return;
        }

        console.log(`\n--- Registrando teste: ---`);
        
        const tiposDeTeste: tipoTeste[] = ["Elétrico", "Hidráulico", "Aerodinâmico"];
        const indexTipo = readline.keyInSelect(tiposDeTeste, "Selecione o tipo de teste:");
        if (indexTipo === -1) {
            console.log("Operação cancelada.");
            return;
        }
        const tipo = tiposDeTeste[indexTipo];

        const resultadosDoTeste: resultadoTeste[] = ["Aprovado", "Reprovado"];
        const indexResultado = readline.keyInSelect(resultadosDoTeste, "Selecione o resultado do teste:");
        if (indexResultado === -1) {
            console.log("Operação cancelada.");
            return;
        }
        const resultado = resultadosDoTeste[indexResultado];

        const novoTeste = new Teste(tipo, resultado);
        aeronave.testes.push(novoTeste);

        const todasAeronaves = this.aeronaveRepo.lerDados();
        const indexAeronave = todasAeronaves.findIndex(a => a.codigo === codigoAeronave);
        if (indexAeronave !== -1) {
            todasAeronaves[indexAeronave] = aeronave;
            this.aeronaveRepo.salvarDados(todasAeronaves);
            console.log(`\nTeste registrado com sucesso!`);
        } else {
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
        } else {
            aeronave.testes.forEach((teste, index) => {
                console.log(`${index + 1}. Tipo: ${teste.tipoTeste} | Resultado: ${teste.resultado}`);
            });
        }
        console.log("----------------------------------------------------");
    }
}