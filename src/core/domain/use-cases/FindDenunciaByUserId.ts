import { Denuncia } from '../entities/Denuncia';
import { IDenunciaRepository } from '../repositories/IDenuncia';

type Input = {
  userId: string;
};

export class FindDenunciasByUserId {
  constructor(private readonly denunciaRepository: IDenunciaRepository) {}

  async execute({ userId }: Input): Promise<Denuncia[]> {
    const denuncias = await this.denunciaRepository.findByUserId(userId);
    return denuncias;
  }
}