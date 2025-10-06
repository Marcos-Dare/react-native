import { User } from '../../../domain/entities/User';
import { Email } from '../../../domain/value-objects/Email';
import { GeoCoordinates } from '../../../domain/value-objects/GeoCoordinates';
import { Name } from '../../../domain/value-objects/Name';
import { Password } from '../../../domain/value-objects/Password';


const MOCK_PASSWORD_HASH = '$2b$12$YgC/D3xr6s30I42F2./AHeDE.21YXB.Y7P4I5fms/Vgl5E5vPDzHS';

describe('Entity: User', () => {

  it('deve criar um usuário válido com todas as propriedades', () => {

    const name = Name.create('John Doe');
    const email = Email.create('john.doe@example.com');
    const password = Password.create(MOCK_PASSWORD_HASH);

    const user = User.create({
      id: '1',
      name: name,
      email: email,
      password: password,
      role: 'cidadão'
    });

    expect(user.id).toBe('1');
    expect(user.name.value).toBe('John Doe');
    expect(user.email.value).toBe('john.doe@example.com');
    expect(user.password.value).toBe(MOCK_PASSWORD_HASH);
    expect(user.role).toBe('cidadão');
  });

  it('deve atualizar o nome do usuário corretamente', () => {
    
    const initialUser = User.create({
      id: '1',
      name: Name.create('John Doe'),
      email: Email.create('john.doe@example.com'),
      password: Password.create(MOCK_PASSWORD_HASH),
      role: 'cidadão',
    });
    const newName = Name.create('Jane Doe');

    
    const updatedUser = initialUser.updateName(newName);

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.name.value).toBe('Jane Doe');
    expect(updatedUser.id).toBe(initialUser.id); 
    expect(initialUser.name.value).toBe('John Doe');
  });
});