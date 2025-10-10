import { Denuncia } from '../entities/Denuncia';
import { IDenunciaRepository } from '../repositories/IDenuncia';
import { IGeocodingService } from '../../services/IGeocodingService';
import { Photo } from '../value-objects/Photo';
import { GeoCoordinates } from '../value-objects/GeoCoordinates';
import { StatusDenuncia } from '../entities/Denuncia';

export type DenunciaComEndereco = {
  id: string;
  userId: string;
  foto: Photo;
  descricao: string | null;
  localizacao: GeoCoordinates;
  status: StatusDenuncia;
  dataHora: Date;
  cidade: string;
  bairro: string;
};

export class FindAllDenuncias {
  constructor(
    private readonly denunciaRepository: IDenunciaRepository,
    private readonly geocodingService: IGeocodingService
  ) {}

  async execute(): Promise<DenunciaComEndereco[]> {
    const denuncias = await this.denunciaRepository.findAll();

    const denunciasComEndereco = await Promise.all(
      denuncias.map(async (denuncia) => {
        const endereco = await this.geocodingService.getEnderecoFromCoordinates(denuncia.localizacao);
        
        return {
          ...denuncia,
          cidade: endereco.cidade,
          bairro: endereco.bairro,
        };
      })
    );

    return denunciasComEndereco;
  }
}