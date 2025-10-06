import { Denuncia } from '../entities/Denuncia';
import { IDenunciaRepository } from '../repositories/IDenuncia';
import { GeoCoordinates } from '../value-objects/GeoCoordinates';
import { StatusDenuncia } from '../entities/Denuncia';

export class UpdateDenuncia {
  constructor(private readonly denunciaRepository: IDenunciaRepository) {}

  async execute(params: {
    id: string;
    descricao?: string;
    localizacao?: GeoCoordinates;
    status?: StatusDenuncia;
  }): Promise<Denuncia> {
    const { id, descricao, localizacao, status } = params;

    const denunciaExistente = await this.denunciaRepository.findById(id);

    if (!denunciaExistente) {
      throw new Error('Denúncia não encontrada');
    }

    let denunciaAtualizada = denunciaExistente;


    if (descricao !== undefined) {
      denunciaAtualizada = denunciaAtualizada.updateDescricao(descricao);
    }
    if (localizacao) {
      denunciaAtualizada = denunciaAtualizada.updateLocalizacao(localizacao);
    }

    if (status) {
      switch (status) {
        case 'em_analise':
          denunciaAtualizada = denunciaAtualizada.iniciarAnalise();
          break;
        case 'resolvida':
          denunciaAtualizada = denunciaAtualizada.resolver();
          break;
        case 'rejeitada':
          denunciaAtualizada = denunciaAtualizada.rejeitar();
          break;
        case 'pendente':
          break;
      }
    }

    await this.denunciaRepository.update(denunciaAtualizada);

    return denunciaAtualizada;
  }
}