
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { Name } from '../value-objects/Name'; 
import { Email } from '../value-objects/Email';

export class UpdateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: {
    id: string;
    name?: string;
    email?: string;
    role?:string
  }): Promise<User> {
    const { id, name, email, role } = params;

    const userExistente = await this.userRepository.findById(id);

    if (!userExistente) {
      throw new Error('Usuário não encontrado');
    }

    let userAtualizado = userExistente;

    if (name) {
      userAtualizado = userAtualizado.updateName(Name.create(name));
    }

    if (email) {
      userAtualizado = userAtualizado.updateEmail(Email.create(email));
    }

    await this.userRepository.update(userAtualizado);

    return userAtualizado;
  }
}