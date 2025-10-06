import { BaseRepository } from "./BaseRepository";
import { Teste } from "../models/Teste";

export class TesteRepository extends BaseRepository<Teste> {

    constructor() {
        super("testes")
    }
}