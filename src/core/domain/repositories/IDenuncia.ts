import { Denuncia } from '../entities/Denuncia';
import { StatusDenuncia } from '../entities/Denuncia';

export interface IDenunciaRepository {
  save(denuncia: Denuncia): Promise<void>;
  findById(id: string): Promise<Denuncia | null>;
  findByUserId(userId: string): Promise<Denuncia[]>;
  findByStatus(status: StatusDenuncia): Promise<Denuncia[]>;
  update(denuncia: Denuncia): Promise<void>;
  delete(id: string): Promise<void>;
}
