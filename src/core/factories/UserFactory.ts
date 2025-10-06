import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '../domain/entities/User';
import { Email } from '../domain/value-objects/Email';
import { Name } from '../domain/value-objects/Name';
import { Password } from '../domain/value-objects/Password';

const MOCK_PASSWORD_HASH = '$2b$12$YgC/D3xr6s30I42F2./AHeDE.21YXB.Y7P4I5fms/Vgl5E5vPDzHS';

export class UserFactory {
  static create(params: {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole;

  }): User {
    const id = params.id ?? uuidv4();
    const name = Name.create(params.name ?? 'John Doe');
    const email = Email.create(params.email ?? 'john.doe@example.com');
    const password = Password.create(params.password ?? MOCK_PASSWORD_HASH);
    const role = params.role ?? 'cidadão';
    
   
    return User.create({
      id,
      name,
      email,
      password,
      role
    });
  }
}