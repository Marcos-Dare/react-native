import { makeDenunciaUseCases } from '../core/factories/makeDenunciaUseCases';
import { MockDenunciaRepository } from '../core/infra/repositories/MockDenunciaRepository';
import { Photo } from '../core/domain/value-objects/Photo';
import { GeoCoordinates } from '../core/domain/value-objects/GeoCoordinates';
import { Denuncia } from '../core/domain/entities/Denuncia';

describe('Teste de Integração de Lógica: Fluxo de CRUD de Denúncia', () => {

  const { 
    registerDenuncia, 
    findDenuncia, 
    updateDenuncia, 
    deleteDenuncia 
  } = makeDenunciaUseCases();


  const repository = MockDenunciaRepository.getInstance();


  beforeEach(() => {
    repository.denuncias = [];
  });

  it('deve realizar um ciclo completo de Criar, Ler, Atualizar e Deletar uma denúncia', async () => {
    
    console.log('ETAPA 1: CREATE');
    const denunciaData = {
      userId: 'user-123',
      foto: Photo.create('file:///test/foto.jpg'),
      localizacao: GeoCoordinates.create(-21.55, -45.43),
      descricao: 'Lixo na calçada.',
    };
    
    const denunciaCriada = await registerDenuncia.execute(denunciaData);
    
    expect(denunciaCriada).toBeInstanceOf(Denuncia);
    expect(denunciaCriada.status).toBe('pendente');
    expect(repository.denuncias).toHaveLength(1);
    expect(repository.denuncias[0].descricao).toBe('Lixo na calçada.');
    console.log('✅ Denúncia criada com sucesso!');

    console.log('\nETAPA 2: READ');
    const idParaBuscar = denunciaCriada.id;
    const denunciaEncontrada = await findDenuncia.execute({ id: idParaBuscar });

    expect(denunciaEncontrada).not.toBeNull();
    expect(denunciaEncontrada?.id).toBe(idParaBuscar);
    console.log('✅ Denúncia encontrada com sucesso!');

    console.log('\nETAPA 3: UPDATE');
    const dadosDeUpdate = {
      id: idParaBuscar,
      descricao: 'Descrição foi atualizada.',
      status: 'em_analise' as const,
    };

    const denunciaAtualizada = await updateDenuncia.execute(dadosDeUpdate);

    const denunciaDoRepo = await repository.findById(idParaBuscar);
    expect(denunciaAtualizada.descricao).toBe('Descrição foi atualizada.');
    expect(denunciaAtualizada.status).toBe('em_analise');
    expect(denunciaDoRepo?.descricao).toBe('Descrição foi atualizada.');
    console.log('✅ Denúncia atualizada com sucesso!');

    console.log('\nETAPA 4: DELETE');
    await deleteDenuncia.execute({ id: idParaBuscar });

    const denunciaDeletada = await repository.findById(idParaBuscar);
    expect(denunciaDeletada).toBeNull();
    expect(repository.denuncias).toHaveLength(0);
    console.log('✅ Denúncia deletada com sucesso!');
  });
});