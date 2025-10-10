import { GeoCoordinates } from "../domain/value-objects/GeoCoordinates";

export type Endereco = {
  cidade: string;
  bairro: string;
};

export interface IGeocodingService {
  getEnderecoFromCoordinates(coords: GeoCoordinates): Promise<Endereco>;
}