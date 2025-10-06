export class Email {
  private constructor(readonly value: string) {}

  static create(email: string): Email {
    if (!this.validate(email)) {
      throw new Error('Email inválido');
    }
    return new Email(email);
  }

  private static validate(email: string): boolean {
    // Regex corrigida (sem o "g" no final)
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }
}