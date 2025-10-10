import { FindAllDenuncias } from '../../../domain/use-cases/FindAllDenuncias';
import { MockDenunciaRepository } from '../../../infra/repositories/MockDenunciaRepository';
import { MockGeocodingService } from '../../../infra/services/MockGeocodingService';
import { Denuncia } from '../../../domain/entities/Denuncia';
import { Photo } from '../../../domain/value-objects/Photo';
import { GeoCoordinates } from '../../../domain/value-objects/GeoCoordinates';
import { v4 as uuidv4 } from 'uuid';

describe('Use Case: FindAllDenuncias', () => {
  let denunciaRepository: MockDenunciaRepository;
  let geocodingService: MockGeocodingService;
  let findAllDenuncias: FindAllDenuncias;

  beforeEach(() => {

    denunciaRepository = MockDenunciaRepository.getInstance();
    (denunciaRepository as any).denuncias = [];
    geocodingService = new MockGeocodingService();
    findAllDenuncias = new FindAllDenuncias(denunciaRepository, geocodingService);
  });

  it('deve retornar todas as denúncias com seus endereços enriquecidos', async () => {

    const denuncia1 = Denuncia.create({ id: uuidv4(), userId: 'user1', foto: Photo.create('file:///foto1.jpg'), localizacao: GeoCoordinates.create(1,1) });
    const denuncia2 = Denuncia.create({ id: uuidv4(), userId: 'user2', foto: Photo.create('file:///foto2.jpg'), localizacao: GeoCoordinates.create(2,2) });
    await denunciaRepository.save(denuncia1);
    await denunciaRepository.save(denuncia2);


    const result = await findAllDenuncias.execute();


    expect(result).toHaveLength(2); 
    

    expect(result[0].id).toBe(denuncia1.id);
    expect(result[0].cidade).toBe('Varginha'); 
    expect(result[0].bairro).toBe('Centro');  


    expect(result[1].id).toBe(denuncia2.id);
    expect(result[1].cidade).toBe('Varginha');
  });

  it('deve retornar um array vazio se não houver denúncias no repositório', async () => {

    const result = await findAllDenuncias.execute();

    
    expect(result).toEqual([]); 
  });
});