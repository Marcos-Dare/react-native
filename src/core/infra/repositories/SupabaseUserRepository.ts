import { supabase } from '../supabase/client/supabaseClient'; // Ajuste o caminho
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { Name } from '../../domain/value-objects/Name';
import { Email } from '../../domain/value-objects/Email';


export class SupabaseUserRepository implements IUserRepository {
  private static instance: SupabaseUserRepository;
  private readonly TABLE_NAME = 'user'; // Nome da sua tabela de perfis

  private constructor() {}

  public static getInstance(): SupabaseUserRepository {
    if (!SupabaseUserRepository.instance) {
      SupabaseUserRepository.instance = new SupabaseUserRepository();
    }
    return SupabaseUserRepository.instance;
  }

  /**
   * Mapeia os dados do Supabase para a entidade User.
   */
  private mapDataToEntity(data: any): User {
    return User.fromDatabase({
      id: data.id,
      name: Name.create(data.name),
      email: Email.create(data.email),
      role: data.role,
    });
  }

  // 'save' é usado pelo caso de uso RegisterUser
  async save(user: User): Promise<void> {
    // 1. Cria o usuário de autenticação
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: user.email.value,
      password: user.password!.value, // 'user.password' não será nulo aqui
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Não foi possível criar o usuário');

    // 2. Cria o perfil público na tabela 'user'
    const { error: profileError } = await supabase.from(this.TABLE_NAME).insert({
      id: authData.user.id,
      name: user.name.value,
      email: user.email.value,
      role: user.role,
    });

    if (profileError) {
      console.error("Falha ao criar o perfil do usuário:", profileError.message);
      throw new Error('Falha ao criar o perfil do usuário após a autenticação.');
    }
  }

  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    if (!data) return null;

    return this.mapDataToEntity(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    if (!data) return null;

    return this.mapDataToEntity(data);
  }

  async update(user: User): Promise<void> {
    // (O seu método de update estava muito bom, mantive a lógica)
    const { error } = await supabase
      .from(this.TABLE_NAME)
      .update({
        name: user.name.value,
        email: user.email.value,
      })
      .eq('id', user.id);

    if (error) throw new Error(error.message);
    
    // Atualiza o email na tabela 'auth' também, se necessário
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser && authUser.email !== user.email.value) {
        const { error: authError } = await supabase.auth.updateUser({ email: user.email.value });
        if (authError) {
            throw new Error(`Perfil atualizado, mas falha ao atualizar o email de autenticação: ${authError.message}`);
        }
    }
  }

  async delete(id: string): Promise<void> {
    // (A sua lógica estava correta)
    const { error } = await supabase.from(this.TABLE_NAME).delete().eq('id', id);
    if (error) throw new Error(error.message);
    console.warn("Perfil do usuário deletado, mas o usuário de autenticação não.");
  }
}