import { IStorageService } from '../../infra/supabase/storage/storageService'; // Ajuste o caminho

export class UploadFileUseCase {
  constructor(private readonly storageService: IStorageService) {}

  /**
   * Recebe a URI local da imagem e os dados do upload.
   */
  async execute(params: {
    imageUri: any,
    bucket: string,
    userId: string
  }): Promise<string> {
    
    // 1. Validação para evitar o erro 'split'
    if (!params.imageUri) {
      throw new Error("URI da imagem não pode ser nula.");
    }
    
    // 2. Apenas repassa a chamada para o serviço de storage
    return this.storageService.uploadImage(
      params.imageUri, 
      params.bucket, 
      params.userId
    );
  }
}