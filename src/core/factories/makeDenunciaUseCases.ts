import { IDenunciaRepository } from '../domain/repositories/IDenuncia';
import { MockDenunciaRepository } from '../infra/repositories/MockDenunciaRepository';
import { RegisterDenuncia } from '../domain/use-cases/RegisterDenuncia';
import { DeleteDenuncia } from '../domain/use-cases/DeleteDenuncia';
import { UpdateDenuncia } from '../domain/use-cases/UpdateDenuncia';
import { FindDenuncia } from '../domain/use-cases/FindDenuncia';
import { FindDenunciasByUserId } from '../domain/use-cases/FindDenunciaByUserId';
import { FindAllDenuncias } from '../domain/use-cases/FindAllDenuncias';
import { MockGeocodingService } from '../infra/services/MockGeocodingService';
import { SupabaseDenunciaRepository } from '../infra/repositories/SupabaseDenunciaRepository';

export function makeDenunciaUseCases() {
  const denunciaRepository: IDenunciaRepository = process.env.EXPO_PUBLIC_USE_API
    ? SupabaseDenunciaRepository.getInstance()
    : MockDenunciaRepository.getInstance();
  const geocodingService = new MockGeocodingService();

  const registerDenuncia = new RegisterDenuncia(denunciaRepository);
  const deleteDenuncia = new DeleteDenuncia(denunciaRepository);
  const updateDenuncia = new UpdateDenuncia(denunciaRepository);
  const findDenuncia = new FindDenuncia(denunciaRepository);
  const findDenunciasByUserId = new FindDenunciasByUserId(denunciaRepository);
  const findAllDenuncias = new FindAllDenuncias(denunciaRepository, geocodingService);

  return {
    registerDenuncia,
    deleteDenuncia,
    updateDenuncia,
    findDenuncia,
    findDenunciasByUserId,
    findAllDenuncias,
  };
}