import { MockDenunciaRepository } from "../../../infra/repositories/MockDenunciaRepository";
import { UpdateDenuncia } from "../../../domain/use-cases/UpdateDenuncia";
import { RegisterDenuncia } from "../../../domain/use-cases/RegisterDenuncia";
import { Photo } from "../../../domain/value-objects/Photo";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates";
import { Denuncia } from "../../../domain/entities/Denuncia";
import { v4 as uuidv4 } from 'uuid'; // Importe o uuid

describe("Caso de Uso: UpdateDenuncia", () => {
    let denunciaRepository: MockDenunciaRepository;
    let registerDenuncia: RegisterDenuncia;
    let updateDenuncia: UpdateDenuncia;

    // A função 'beforeEach' é executada antes de cada teste 'it'
    beforeEach(() => {
        denunciaRepository = MockDenunciaRepository.getInstance();
        (denunciaRepository as any).denuncias = []; // Limpa o repositório
        registerDenuncia = new RegisterDenuncia(denunciaRepository);
        updateDenuncia = new UpdateDenuncia(denunciaRepository);
    });

    it("deve atualizar uma denuncia com sucesso", async () => {
        // Arrange
        const denunciaOriginal = await registerDenuncia.execute({
            userId: "1",
            foto: Photo.create("file:///home/marcos/Imagens/tela3.png"),
            localizacao: GeoCoordinates.create(-23.1234, -43.1234),
            descricao: "essa é 1"
        });

        expect(denunciaOriginal.descricao).toBe("essa é 1"); // Não precisa de 'await' aqui

        // Act
        const denunciaAtualizada = await updateDenuncia.execute({
            id: denunciaOriginal.id,
            descricao: "essa é 2",
            localizacao: GeoCoordinates.create(-23.1234, -43.1234),
        });

        // Assert
        expect(denunciaAtualizada).toBeInstanceOf(Denuncia);
        expect(denunciaAtualizada.descricao).toBe("essa é 2"); // Não precisa de 'await' aqui
    });

    it("deve lançar um erro ao tentar atualizar uma denúncia que não existe", async () => {
        const idInexistente = "11";

        await expect(
            updateDenuncia.execute({
                id: idInexistente,
                descricao: "essa é 2",
            })
        ).rejects.toThrow(new Error('Denúncia não encontrada'));
    });

    it('deve atualizar o status para "em_analise"', async () => {
        // Arrange
        const denunciaOriginal = await registerDenuncia.execute({
            userId: "1",
            foto: Photo.create("file:///test.png"),
            localizacao: GeoCoordinates.create(0, 0),
        });

        // Act
        await updateDenuncia.execute({
            id: denunciaOriginal.id,
            status: 'em_analise',
        });

        // Assert
        const denunciaDoRepositorio = await denunciaRepository.findById(denunciaOriginal.id);
        expect(denunciaDoRepositorio?.status).toBe('em_analise');
    });

    it('deve atualizar apenas a localização, sem alterar outros dados', async () => {
        // Arrange
        const denunciaOriginal = await registerDenuncia.execute({
            userId: "1",
            foto: Photo.create("file:///test.png"),
            localizacao: GeoCoordinates.create(0, 0),
        });

        const novaLocalizacao = GeoCoordinates.create(1, 2);

        // Act
        await updateDenuncia.execute({
            id: denunciaOriginal.id,
            localizacao: novaLocalizacao,
        });

        // Assert
        const denunciaDoRepositorio = await denunciaRepository.findById(denunciaOriginal.id);
        expect(denunciaDoRepositorio?.localizacao).toEqual(novaLocalizacao);
        expect(denunciaDoRepositorio?.status).toBe('pendente'); // Verifica se o status foi mantido
    });
});