import * as fs from 'fs';
import * as path from 'path';

export class BaseRepository<T> {
    private caminhoArquivoBanco: string;
    private chave: string;

    constructor(chave: string) {
        this.chave = chave;
        this.caminhoArquivoBanco = path.resolve(__dirname, '..', '..', 'database.json'); 
    }

    private lerBancoCompleto(): Record<string, any> {
        const dadosBrutos = fs.readFileSync(this.caminhoArquivoBanco, 'utf-8');
        return JSON.parse(dadosBrutos);
    }

    private salvarBancoCompleto(dados: Record<string, any>): void {
        fs.writeFileSync(this.caminhoArquivoBanco, JSON.stringify(dados, null, 2), 'utf-8');
    }

    lerDados(): T[] {
        const banco = this.lerBancoCompleto();
        return banco[this.chave] ?? [];
    }

    public salvarDados(dados: T[]): void {
        const banco = this.lerBancoCompleto();
        banco[this.chave] = dados;
        this.salvarBancoCompleto(banco);
    }

    gerarProximoId(): number {
        const dados = this.lerDados();
        if (dados.length === 0) return 1;
        
        const ids = dados.map((item: any) => item.id);
        const maiorId = Math.max(...ids);
        return maiorId + 1;
    }
}