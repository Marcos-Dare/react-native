import { MockDenunciaRepository } from "../../../infra/repositories/MockDenunciaRepository";
import { Denuncia } from "../../../domain/entities/Denuncia";
import { RegisterDenuncia } from "../../../domain/use-cases/RegisterDenuncia";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates";
import { Photo } from "../../../domain/value-objects/Photo";

describe('Caso de Uso: RegisterDenuncia', () => {
    it('deve registrar uma denuncia com sucesso', async ()=> {
        const denunciaRepository = new MockDenunciaRepository()
        const registerDenuncia = new RegisterDenuncia(denunciaRepository)

        const denuncia = {
            userId: "1",
            foto: Photo.create("file:///home/marcos/Imagens/tela3.png"),
            localizacao: GeoCoordinates.create(-23.5613, -46.6565),
            descricao: "MUito lixo"
        }

        const resposta = await registerDenuncia.execute(denuncia)
        expect(resposta).toBeInstanceOf(Denuncia)

        expect(resposta.descricao).toBe('MUito lixo')

    })
})