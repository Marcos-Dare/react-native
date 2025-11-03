import { supabase } from '../supabase/client/supabaseClient';
import { IDenunciaRepository } from '../../domain/repositories/IDenuncia';
import { Denuncia, StatusDenuncia } from '../../domain/entities/Denuncia';
import { Photo } from '../../domain/value-objects/Photo';
import { GeoCoordinates } from '../../domain/value-objects/GeoCoordinates';

export class SupabaseDenunciaRepository implements IDenunciaRepository {
  private static instance: SupabaseDenunciaRepository;
  private readonly TABLE_NAME = 'denuncias'; // Nome da sua tabela no Supabase

  private constructor() {}

  public static getInstance(): SupabaseDenunciaRepository {
    if (!SupabaseDenunciaRepository.instance) {
      SupabaseDenunciaRepository.instance = new SupabaseDenunciaRepository();
    }
    return SupabaseDenunciaRepository.instance;
  }

  /**
   * Mapeia os dados brutos do Supabase (snake_case) para uma entidade Denuncia.
   */
  private mapDataToEntity(data: any): Denuncia {
    // Usamos o novo método 'fromDatabase' que vamos adicionar à entidade
    return Denuncia.fromDatabase({
      id: data.id,
      userId: data.user_id,
      foto: Photo.create(data.foto_url),
      descricao: data.descricao,
      localizacao: GeoCoordinates.create(data.latitude, data.longitude),
      status: data.status,
      dataHora: new Date(data.data_hora),
    });
  }

  async save(denuncia: Denuncia): Promise<void> {
    const { error } = await supabase.from(this.TABLE_NAME).insert({
      id: denuncia.id, // Assumindo que o ID é gerado no 'core' (ex: uuidv4)
      user_id: denuncia.userId,
      foto_url: denuncia.foto.uri,
      descricao: denuncia.descricao,
      latitude: denuncia.localizacao.latitude,
      longitude: denuncia.localizacao.longitude,
      status: denuncia.status,
      data_hora: denuncia.dataHora.toISOString(),
    });

    if (error) {
      console.error('Erro ao salvar denúncia:', error);
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<Denuncia | null> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116: "0 linhas"
      throw new Error(error.message);
    }
    if (!data) {
      return null;
    }
    return this.mapDataToEntity(data);
  }

  async findAll(): Promise<Denuncia[]> {
    const { data, error } = await supabase.from(this.TABLE_NAME).select('*');
    if (error) throw new Error(error.message);
    if (!data) return [];
    return data.map(this.mapDataToEntity);
  }
  
  async findByUserId(userId: string): Promise<Denuncia[]> {
    const { data, error } = await supabase.from(this.TABLE_NAME)
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw new Error(error.message);
    if (!data) return [];
    return data.map(this.mapDataToEntity);
  }

  async findByStatus(status: StatusDenuncia): Promise<Denuncia[]> {
     const { data, error } = await supabase.from(this.TABLE_NAME)
      .select('*')
      .eq('status', status);
      
    if (error) throw new Error(error.message);
    if (!data) return [];
    return data.map(this.mapDataToEntity);
  }

  async update(denuncia: Denuncia): Promise<void> {
    const { error } = await supabase
      .from(this.TABLE_NAME)
      .update({
        // Campos que podem ser atualizados
        descricao: denuncia.descricao,
        status: denuncia.status,
        latitude: denuncia.localizacao.latitude,
        longitude: denuncia.localizacao.longitude,
      })
      .eq('id', denuncia.id);

    if (error) throw new Error(error.message);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(this.TABLE_NAME).delete().eq('id', id);
    if (error) throw new Error(error.message);
  }
}