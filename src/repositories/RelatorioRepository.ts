import * as fs from 'fs';
import * as path from 'path';

export class RelatorioRepository {
    private caminhoArquivo: string;
    private diretorioReports: string = path.resolve(__dirname, '..', '..', 'reports');

    constructor(nomeArquivo: string) {
        this.caminhoArquivo = path.join(this.diretorioReports, nomeArquivo);
    }

    salvar(relatorio: string): void {
        try {
            if (!fs.existsSync(this.diretorioReports)) {
                fs.mkdirSync(this.diretorioReports, { recursive: true });
            }
            
            fs.writeFileSync(this.caminhoArquivo, relatorio, 'utf-8');
            console.log(`\nRelatório salvo com sucesso em: ${this.caminhoArquivo}`);
        } catch (error) {
            console.error("Erro ao salvar o relatório:", error);
        }
    }
}