import { IDenunciaRepository } from '../../domain/repositories/IDenuncia';
import { Denuncia, StatusDenuncia } from '../../domain/entities/Denuncia';

export class MockDenunciaRepository implements IDenunciaRepository {

  public denuncias: Denuncia[] = [];

  async save(denuncia: Denuncia): Promise<void> {
    this.denuncias.push(denuncia);
  }

  async findById(id: string): Promise<Denuncia | null> {
    const found = this.denuncias.find(d => d.id === id);
    return found || null;
  }

  async findByUserId(userId: string): Promise<Denuncia[]> {

    const found = this.denuncias.filter(d => d.userId === userId);
    return found;
  }

  async findByStatus(status: StatusDenuncia): Promise<Denuncia[]> {

    const found = this.denuncias.filter(d => d.status === status);
    return found;
  }

  async update(denuncia: Denuncia): Promise<void> {
    const denunciaIndex = this.denuncias.findIndex(d => d.id === denuncia.id);
    if (denunciaIndex !== -1) {
      this.denuncias[denunciaIndex] = denuncia;
    }

  }

  async delete(id: string): Promise<void> {
    this.denuncias = this.denuncias.filter(d => d.id !== id);
  }

  async findAll(): Promise<Denuncia[]> {
    return this.denuncias;
  }
}