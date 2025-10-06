import { Aeronave } from "../models/Aeronave";
import { tipoAeronave } from "../models/enums";
import { BaseRepository } from "./BaseRepository";

export class AeronaveRepository extends BaseRepository<Aeronave> {

    constructor() {
        super("aeronaves");
    }
    
    mostrarDetalhes(codigo: string): void {
        const aeronave = this.buscarPorCodigo(codigo);
        if (aeronave) {
            console.log(`\n--- Detalhes da Aeronave: ${aeronave.codigo} ---`);
            console.log(`Modelo: ${aeronave.modelo}`);
            console.log(`Tipo: ${aeronave.tipoAeronave}`);
            console.log(`Capacidade: ${aeronave.capacidade}`);
            console.log(`Alcance: ${aeronave.alcance} km`);
            console.log("Peças:", aeronave.pecas.length > 0 ? aeronave.pecas.map(p => p.nome).join(', ') : 'Nenhuma peça associada');
            console.log("Etapas:", aeronave.etapas.length > 0 ? aeronave.etapas.map(e => e.nome).join(', ') : 'Nenhuma etapa associada');
            console.log("Testes:", aeronave.testes.length > 0 ? aeronave.testes.map(t => t.tipoTeste).join(', ') : 'Nenhum teste associado');
            console.log(`------------------------------------------\n`);
        } else {
            console.log("Aeronave não encontrada.");
        }
    }

    registrarAeronave(codigo: string, modelo: string, tipoAeronave: tipoAeronave, capacidade: number, alcance: number): void {
        const banco = this.lerDados();
        if (banco.some(a => a.codigo === codigo)) {
            console.log("Erro: Já existe uma aeronave com este código.");
            return;
        }
        const novaAeronave = new Aeronave(codigo, modelo, tipoAeronave, capacidade, alcance);
        banco.push(novaAeronave);
        this.salvarDados(banco);
        console.log("Aeronave registrada com sucesso!");
    }

    listarAeronaves(): Aeronave[] {
        const lista = this.lerDados();
        if (lista.length === 0) {
            console.log("Nenhuma aeronave registrada.");
        } else {
            console.log("--- Aeronaves Registradas ---");
            lista.forEach(a => {
                console.log(`Código: ${a.codigo}, Modelo: ${a.modelo}`);
            });
            console.log("----------------------------");
        }
        return lista;
    }

    buscarPorCodigo(codigo: string): Aeronave | undefined {
        const aeronaves = this.lerDados();
        return aeronaves.find(a => a.codigo === codigo);
    }
}