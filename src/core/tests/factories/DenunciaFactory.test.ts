import { DenunciaFactory } from "../../factories/DenunciaFactory";
import { Photo } from "../../domain/value-objects/Photo";
import { Denuncia } from "../../domain/entities/Denuncia";

describe('Factory: DenunciaFactory', () => {

  it('deverá criar uma denúncia com os valores padrões', () => {
    const denuncia = DenunciaFactory.create({});

    expect(denuncia).toBeDefined();
    expect(denuncia).toBeInstanceOf(Denuncia);
    
    expect(denuncia.descricao).toBe('Descrição de teste para a denúncia.');
    
    expect(denuncia.foto.uri).toBe('https://example.com/denuncia.jpg');
    
    expect(denuncia.status).toBe('pendente');
  });

  it('deverá criar uma denúncia com valores customizados', () => {
    const dadosCustomizados = {
      descricao: 'Luz queimada na Rua Principal.',
      photoUrl: 'file:///custom/path.jpg',
    };
    
    const denuncia = DenunciaFactory.create(dadosCustomizados);

    expect(denuncia.descricao).toBe(dadosCustomizados.descricao);
    expect(denuncia.foto.uri).toBe(dadosCustomizados.photoUrl);
  });
});