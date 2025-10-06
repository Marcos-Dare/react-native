import { Denuncia } from '../entities/Denuncia';
import { IDenunciaRepository } from '../repositories/IDenuncia';

export class FindDenuncia {
  constructor(private readonly denunciaRepository: IDenunciaRepository) {}

  async execute(params: { id: string }): Promise<Denuncia | null> {
    return this.denunciaRepository.findById(params.id);
  }
}