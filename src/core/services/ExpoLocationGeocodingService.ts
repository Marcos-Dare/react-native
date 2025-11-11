import { IGeocodingService, Endereco } from "../services/IGeocodingService"
import { GeoCoordinates } from "../../core/domain/value-objects/GeoCoordinates";
import * as Location from 'expo-location';

export class ExpoLocationGeocodingService implements IGeocodingService {
  
  async getEnderecoFromCoordinates(coords: GeoCoordinates): Promise<Endereco> {
    try {
      // 1. Usa a função nativa do expo-location para fazer a geocodificação reversa
      const results = await Location.reverseGeocodeAsync(coords);

      if (!results || results.length === 0) {
        throw new Error('Endereço não encontrado para estas coordenadas.');
      }

      // 2. Pega o primeiro resultado (o mais provável)
      const end = results[0];

      // 3. Retorna o objeto Endereco no formato que nosso "core" espera
      return {
        cidade: end.city ?? 'Cidade não identificada',
        bairro: end.subregion ?? end.district ?? 'Bairro não identificado',
      };

    } catch (error) {
      console.error("Erro na geocodificação reversa:", error);
      throw new Error("Não foi possível obter o endereço.");
    }
  }
}