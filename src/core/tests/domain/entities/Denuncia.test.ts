import { Denuncia } from '../../../domain/entities/Denuncia';
import { Photo } from '../../../domain/value-objects/Photo';
import { GeoCoordinates } from '../../../domain/value-objects/GeoCoordinates';
import { v4 as uuidv4 } from 'uuid';

describe('Entity: Denuncia', () => {

  const baseProps = {
    id: uuidv4(),
    userId: uuidv4(),
    foto: Photo.create('https://example.com/foto.jpg'),
    localizacao: GeoCoordinates.create(-23.5613, -46.6565),
    descricao: 'Poste de luz quebrado na esquina.',
  };


  it('deve criar uma denúncia válida com status "pendente" e data atual', () => {
    
    const denuncia = Denuncia.create(baseProps);

   
    expect(denuncia).toBeInstanceOf(Denuncia);
    expect(denuncia.id).toBe(baseProps.id);
    expect(denuncia.descricao).toBe(baseProps.descricao);
    
    
    expect(denuncia.status).toBe('pendente');
    expect(denuncia.dataHora).toBeInstanceOf(Date);
    
    expect(denuncia.dataHora.getTime()).toBeCloseTo(Date.now(), -3); 
  });

  
  it('deve retornar uma nova instância com o status "resolvida" ao chamar resolver()', () => {
 
    const denunciaPendente = Denuncia.create(baseProps);

  
    const denunciaResolvida = denunciaPendente.resolver();

 
    expect(denunciaResolvida.status).toBe('resolvida');
    expect(denunciaResolvida.id).toBe(denunciaPendente.id);
    

    expect(denunciaPendente.status).toBe('pendente');
  });
  

  it('deve retornar uma nova instância com a descrição atualizada ao chamar updateDescricao()', () => {
   
    const denunciaOriginal = Denuncia.create(baseProps);
    const novaDescricao = 'O poste foi consertado, mas a luz ainda não acende.';

  
    const denunciaAtualizada = denunciaOriginal.updateDescricao(novaDescricao);

   
    expect(denunciaAtualizada.descricao).toBe(novaDescricao);
    expect(denunciaAtualizada.id).toBe(denunciaOriginal.id);
    expect(denunciaAtualizada.status).toBe(denunciaOriginal.status); 
    

    expect(denunciaOriginal.descricao).toBe(baseProps.descricao);
  });

 
  it('deve retornar uma nova instância com o status "em_analise" ao chamar iniciarAnalise()', () => {
 
    const denunciaPendente = Denuncia.create(baseProps);

    const denunciaEmAnalise = denunciaPendente.iniciarAnalise();

    expect(denunciaEmAnalise.status).toBe('em_analise');
    expect(denunciaPendente.status).toBe('pendente');
  });
});