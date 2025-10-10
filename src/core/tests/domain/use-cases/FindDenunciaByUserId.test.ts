import { FindDenunciasByUserId } from '../../../domain/use-cases/FindDenunciaByUserId';
import { MockDenunciaRepository } from '../../../infra/repositories/MockDenunciaRepository';
import { Denuncia } from '../../../domain/entities/Denuncia';
import { Photo } from '../../../domain/value-objects/Photo';
import { GeoCoordinates } from '../../../domain/value-objects/GeoCoordinates';
import { v4 as uuidv4 } from 'uuid';

describe('Use Case: FindDenunciasByUserId', () => {
  let repository: MockDenunciaRepository;
  let findDenunciasByUserId: FindDenunciasByUserId;

  beforeEach(() => {
    repository = MockDenunciaRepository.getInstance();
    (repository as any).denuncias = [];
    findDenunciasByUserId = new FindDenunciasByUserId(repository);
  });

  const createTestDenuncia = (userId: string) => {
    return Denuncia.create({
      id: uuidv4(),
      userId: userId,
      foto: Photo.create('file:///test/foto.jpg'),
      localizacao: GeoCoordinates.create(-23.5613, -46.6565),
    });
  };

  it('deve retornar apenas as denúncias pertencentes a um userId específico', async () => {

    const targetUserId = 'user-com-denuncias';
    const otherUserId = 'outro-user';

    const denuncia1 = createTestDenuncia(targetUserId);
    const denuncia2 = createTestDenuncia(targetUserId);
    const denunciaDeOutroUser = createTestDenuncia(otherUserId);

    await repository.save(denuncia1);
    await repository.save(denuncia2);
    await repository.save(denunciaDeOutroUser);

    const result = await findDenunciasByUserId.execute({ userId: targetUserId });


    expect(result).toHaveLength(2);
    expect(result[0].userId).toBe(targetUserId);
    expect(result[1].userId).toBe(targetUserId);
  });

  it('deve retornar um array vazio se o usuário não tiver denúncias', async () => {

    const otherUserId = 'outro-user';
    await repository.save(createTestDenuncia(otherUserId));


    const result = await findDenunciasByUserId.execute({ userId: 'user-sem-denuncias' });


    expect(result).toBeDefined();
    expect(result).toEqual([]); 
    expect(result).toHaveLength(0);
  });
});