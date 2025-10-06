import { MockDenunciaRepository } from "../../../infra/repositories/MockDenunciaRepository";
import { FindDenuncia } from "../../../domain/use-cases/FindDenuncia";
import { RegisterDenuncia } from "../../../domain/use-cases/RegisterDenuncia";
import { Photo } from "../../../domain/value-objects/Photo";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates";
import { Denuncia } from "../../../domain/entities/Denuncia";

describe("Testar caso de uso: FindDenuncia", () => {
    it("testar se está encocntrando a denuncia com sucesso", async () => {
        const denunciaRepository = new MockDenunciaRepository()
        const registerDenuncia = new RegisterDenuncia(denunciaRepository)
        const findDenuncia = new FindDenuncia(denunciaRepository)

        const denuncia = {
            userId: "1",
            foto: Photo.create("file:///home/marcos/Imagens/tela3.png"),
            localizacao: GeoCoordinates.create(-43.5684, -43.4884),
            descricao: "Testando"
        }

        const resposta = registerDenuncia.execute(denuncia)

        const find = await findDenuncia.execute({id: (await resposta).id})

        expect(find).toBeInstanceOf(Denuncia)
        expect(find?.descricao).toBe("Testando")
    })
})