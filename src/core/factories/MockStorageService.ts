import { IStorageService } from "../infra/supabase/storage/storageService"; // Ajuste o caminho


export class MockStorageService implements IStorageService {
  
  async uploadImage(imageUri: string, bucket: string, userId: string): Promise<string> {
    console.log(`[MockStorageService] Simulado upload da imagem: ${imageUri}`);
    return 'https://exemplo.com/imagem-mock.jpg';
  }

  async deleteFile(bucket: string, path: string): Promise<void> {
    console.log(`[MockStorageService] Simulado delete do arquivo: ${path}`);
    return Promise.resolve();
  }

  getPublicUrl(bucket: string, path: string): string {
    return `https://exemplo.com/${path}`;
  }
}