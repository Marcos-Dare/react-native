
import { Email } from '../value-objects/Email';
import { Name } from '../value-objects/Name';
import { Password } from '../value-objects/Password';

export type UserRole = "cidadão" | "agente";

export class User {
  readonly id: string;
  readonly name: Name;
  readonly email: Email;
  readonly password: Password | null;
  readonly role: UserRole;


  private constructor(props: {
    id: string;
    name: Name;
    email: Email;
    password: Password | null;
    role: UserRole;

  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;

  }

  static create(props: {
    id: string;
    name: Name;
    email: Email;
    password: Password;
    role: UserRole;
  }): User {
    return new User({
      ...props,
    });
  }

  static fromDatabase(props: {
    id: string;
    name: Name;
    email: Email;
    role: UserRole;
  }): User {
    return new User({
      ...props,
      password: null,
    });
  }

  public updateName(newName: Name): User {
    return new User({ ...this, name: newName });
  }

  public updateEmail(newEmail: Email): User {
    return new User({ ...this, email: newEmail });
  }
}