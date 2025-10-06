import { DeleteDenuncia } from "../../../domain/use-cases/DeleteDenuncia";
import { RegisterDenuncia } from "../../../domain/use-cases/RegisterDenuncia";
import { MockDenunciaRepository } from "../../../infra/repositories/MockDenunciaRepository";
import { Photo } from "../../../domain/value-objects/Photo";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates";

describe('Caso de Uso: DeleteDenuncia', ()=>{
    it('deve deletar uma denuncia existente', async ()=> {
        const denunciaRepository = new MockDenunciaRepository();
        const registerDenuncia = new RegisterDenuncia(denunciaRepository);
        const deleteDenuncia = new DeleteDenuncia(denunciaRepository);


        const denuncia = await registerDenuncia.execute({
            userId: "1",
            foto: Photo.create("file:///home/marcos/Imagens/tela3.png"),
             localizacao: GeoCoordinates.create(-23.5613, -46.6565)
        })

        await deleteDenuncia.execute({id: denuncia.id})

        const denunciaDeletada = await denunciaRepository.findById(denuncia.id)
        expect(denunciaDeletada).toBeNull();
    });
})