import { v4 as uuidv4 } from 'uuid';
import { Denuncia } from '../domain/entities/Denuncia';
import { Photo } from '../domain/value-objects/Photo';
import { GeoCoordinates } from '../domain/value-objects/GeoCoordinates';

export class DenunciaFactory {
  static create(params: {
    id?: string;
    userId?: string;
    photoUrl?: string;
    descricao?: string;
    latitude?: number;
    longitude?: number;
  }): Denuncia {

    const id = params.id ?? uuidv4();
    const userId = params.userId ?? uuidv4(); 
    const photo = Photo.create(params.photoUrl ?? 'https://example.com/denuncia.jpg');
    const descricao = params.descricao ?? 'Descrição de teste para a denúncia.';
    

    const latitude = params.latitude ?? -23.5613;
    const longitude = params.longitude ?? -46.6565;
    const localizacao = GeoCoordinates.create(latitude, longitude);


    return Denuncia.create({
      id,
      userId,
      foto: photo,
      descricao,
      localizacao,
    });
  }
}