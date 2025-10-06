export class Photo {
  private constructor(readonly uri: string) {} 

  static create(source: string): Photo {
    if (!this.validate(source)) {
      throw new Error('Fonte da imagem (URI) inválida');
    }
    return new Photo(source);
  }

  private static validate(source: string): boolean {

    const isWebUrl = source.startsWith('http://') || source.startsWith('https://');
    const isFileUri = source.startsWith('file://');

    return isWebUrl || isFileUri;
  }
}