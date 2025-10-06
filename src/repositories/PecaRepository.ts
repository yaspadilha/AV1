import { Peca } from "../models/Peca";
import { statusPeca } from "../models/enums";
import { BaseRepository } from "./BaseRepository";

export class PecaRepository extends BaseRepository<Peca> {

    constructor() {
        super("pecas");
    }

    cadastrar(peca: Peca): void {
        const pecas = this.lerDados();
        pecas.push(peca);
        this.salvarDados(pecas);
    }

    atualizarStatus(id: number, novoStatus: statusPeca): string {
        const pecas = this.lerDados();
        const index = pecas.findIndex(p => p.id === id);

        if (index !== -1) {
            const peca = pecas[index];
            if (peca) {
                peca.statusPeca = novoStatus;
                this.salvarDados(pecas);
                return "Status atualizado";
            }
        }
        return "Peça não encontrada";
    }
}