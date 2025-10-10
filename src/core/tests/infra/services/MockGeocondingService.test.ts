import { MockGeocodingService } from "../../../infra/services/MockGeocodingService";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates"

describe('Infra: MockGeocodingService', () => {
  it('deve retornar um endereço mockado para quaisquer coordenadas fornecidas', async () => {

    const service = new MockGeocodingService();
    const qualquerCoordenada = GeoCoordinates.create(-21.55, -45.43); 


    const endereco = await service.getEnderecoFromCoordinates(qualquerCoordenada);


    expect(endereco).toBeDefined();
    expect(endereco.cidade).toBe('Varginha');
    expect(endereco.bairro).toBe('Centro');
  });
});