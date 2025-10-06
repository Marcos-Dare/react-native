import { v4 as uuidv4 } from 'uuid'; // Importa a função v4 da biblioteca
import { Denuncia } from '../entities/Denuncia';
import { IDenunciaRepository } from '../repositories/IDenuncia';
import { Photo } from '../value-objects/Photo';
import { GeoCoordinates } from '../value-objects/GeoCoordinates';

export class RegisterDenuncia {
  constructor(private readonly denunciaRepository: IDenunciaRepository) {}

  async execute(params: {
    userId: string;
    foto: Photo;
    localizacao: GeoCoordinates;
    descricao?: string;
  }): Promise<Denuncia> {
    const { userId, foto, localizacao, descricao } = params;

    const denuncia = Denuncia.create({
      id: uuidv4(),
      userId,
      foto,
      localizacao,
      descricao,
    });

    await this.denunciaRepository.save(denuncia);

    return denuncia;
  }
}