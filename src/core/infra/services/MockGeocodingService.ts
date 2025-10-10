import { Endereco, IGeocodingService } from "../../services/IGeocodingService"
import { GeoCoordinates } from "../../domain/value-objects/GeoCoordinates";

export class MockGeocodingService implements IGeocodingService {
  async getEnderecoFromCoordinates(coords: GeoCoordinates): Promise<Endereco> {
    console.log(`Buscando endereço para Lat: ${coords.latitude}, Lon: ${coords.longitude}`);
    return Promise.resolve({
      cidade: "Varginha",
      bairro: "Centro",
    });
  }
}