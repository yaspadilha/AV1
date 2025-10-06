"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class BaseRepository {
    constructor(chave) {
        this.chave = chave;
        this.caminhoArquivoBanco = path.resolve(__dirname, '..', '..', 'database.json');
    }
    lerBancoCompleto() {
        const dadosBrutos = fs.readFileSync(this.caminhoArquivoBanco, 'utf-8');
        return JSON.parse(dadosBrutos);
    }
    salvarBancoCompleto(dados) {
        fs.writeFileSync(this.caminhoArquivoBanco, JSON.stringify(dados, null, 2), 'utf-8');
    }
    lerDados() {
        const banco = this.lerBancoCompleto();
        return banco[this.chave] ?? [];
    }
    salvarDados(dados) {
        const banco = this.lerBancoCompleto();
        banco[this.chave] = dados;
        this.salvarBancoCompleto(banco);
    }
    gerarProximoId() {
        const dados = this.lerDados();
        if (dados.length === 0)
            return 1;
        const ids = dados.map((item) => item.id);
        const maiorId = Math.max(...ids);
        return maiorId + 1;
    }
}
exports.BaseRepository = BaseRepository;
