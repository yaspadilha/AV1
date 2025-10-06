"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PecaRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
class PecaRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super("pecas");
    }
    cadastrar(peca) {
        const pecas = this.lerDados();
        pecas.push(peca);
        this.salvarDados(pecas);
    }
    atualizarStatus(id, novoStatus) {
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
exports.PecaRepository = PecaRepository;
