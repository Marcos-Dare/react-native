import { Photo } from '../../../domain/value-objects/Photo';

describe('Photo', () => {
  it('should create a valid photo URL', () => {
    const photo = Photo.create('https://example.com/photo.jpg');
    expect(photo.uri).toBe('https://example.com/photo.jpg');
  });

  it('should throw an error for an invalid URL', () => {
    expect(() => Photo.create('invalid-url')).toThrow('Fonte da imagem (URI) inválida');
  });
});
