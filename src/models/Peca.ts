export type tipoPeca = "Nacional" | "Importada";
export type statusPeca = "Em produção" | "Em transporte" | "Pronta para uso";

export class Peca {
    id : number;
    nome : string;
    tipoPeca : tipoPeca;
    fornecedor : string;
    statusPeca : statusPeca;

    constructor(id : number, nome : string, tipoPeca : tipoPeca, fornecedor : string, statusPeca : statusPeca) {
        this.id = id;
        this.nome = nome;
        this.tipoPeca = tipoPeca;
        this.fornecedor = fornecedor;
        this.statusPeca = statusPeca;
    }
}