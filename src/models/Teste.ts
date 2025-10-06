type tipoTeste = "Elétrico" | "Hidráulico" | "Aerodinâmico";
type resultadoTeste = "Aprovado" | "Reprovado";

export class Teste {
    tipoTeste : tipoTeste; 
    resultado : resultadoTeste; 

    constructor(tipoTeste : tipoTeste, resultado : resultadoTeste) {
        this.tipoTeste = tipoTeste;
        this.resultado = resultado;
    }
}