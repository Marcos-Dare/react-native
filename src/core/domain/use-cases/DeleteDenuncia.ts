import { IDenunciaRepository } from '../repositories/IDenuncia';

export class DeleteDenuncia {
  constructor(private readonly denunciaRepository: IDenunciaRepository) {}

  async execute(params: { id: string }): Promise<void> {
    const { id } = params;

    const record = await this.denunciaRepository.findById(id);

    if (!record) {
      throw new Error('Denúncia não encontrada');
    }

    await this.denunciaRepository.delete(id);
  }
}