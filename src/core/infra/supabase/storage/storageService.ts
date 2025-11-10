import { supabase } from '../client/supabaseClient'; // Verifique se o caminho está correto

/**
 * Define o "contrato" para qualquer serviço de storage.
 * Ele espera uma 'imageUri' (string), não o objeto 'ImagePickerAsset'.
 */
export interface IStorageService {
  uploadImage(imageUri: string, bucket: string, userId: string): Promise<string>;
  deleteFile(bucket: string, path: string): Promise<void>;
  getPublicUrl(bucket: string, path: string): string;
}

/**
 * A implementação concreta do serviço de storage usando o Supabase.
 */
export class SupabaseStorageService implements IStorageService {

  /**
   * O primeiro parâmetro agora é 'imageUri: string'
   */
  async uploadImage(imageUri: string, bucket: string, userId: string): Promise<string> {
    try {
      // 1. Prepara o nome e tipo do arquivo a partir da string 'imageUri'
      const fileExt = imageUri.split('.').pop(); // Agora 'imageUri' é uma string
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const contentType = `image/${fileExt}`;

      // 2. Cria o FormData para enviar o arquivo
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: `photo_${Date.now()}.${fileExt}`,
        type: contentType,
      } as unknown as Blob);

      // 3. Faz o upload para o Supabase
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, formData);

      if (uploadError) {
        throw new Error(`Falha no upload da imagem: ${uploadError.message}`);
      }

      // 4. Retorna a URL pública do arquivo salvo
      return this.getPublicUrl(bucket, fileName);

    } catch (error) {
      console.error('Erro no upload:', error);
      throw error;
    }
  }

  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw new Error(error.message);
  }

  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    if (!data?.publicUrl) {
      throw new Error("Não foi possível obter a URL pública do arquivo.");
    }
    return data.publicUrl;
  }
}