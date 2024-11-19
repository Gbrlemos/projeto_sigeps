import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlanos, getAtividades, getPlanoRecursos } from '../service/api'; // Importando a função getPlanoRecursos

const PlanoDetalhado = () => {
  const { idPlano } = useParams(); // Obtém o ID do plano da URL
  const [plano, setPlano] = useState(null);
  const [atividades, setAtividades] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const navigate = useNavigate();

  // Função para buscar os detalhes do plano
  useEffect(() => {
    const fetchPlanoDetalhado = async () => {
      try {
        // Buscar o plano específico
        const planos = await getPlanos();
        console.log('Planos encontrados: ', planos);
        const planoSelecionado = planos.find(
          (plano) => plano.id_plano === parseInt(idPlano)
        );
        console.log('idPlano: ', idPlano);
        console.log('Plano selecionado: ', planoSelecionado);

        if (planoSelecionado) {
          setPlano(planoSelecionado);
        } else {
          console.error('Plano não encontrado!');
          navigate('/'); // Redireciona se o plano não for encontrado
        }

        // Buscar as atividades relacionadas ao plano
        const atividadesData = await getAtividades();
        const atividadesFiltradas = atividadesData.filter(
          (atividade) => atividade.id_plano === parseInt(idPlano)
        );
        setAtividades(atividadesFiltradas);

        // Buscar os recursos vinculados ao plano via plano_recurso
        const recursosData = await getPlanoRecursos(idPlano);
        setRecursos(recursosData); // Adiciona os recursos retornados
      } catch (error) {
        console.error('Erro ao buscar detalhes do plano:', error);
      }
    };

    fetchPlanoDetalhado();
  }, [idPlano, navigate]);

  return (
    <div className="container">
      <h1>Detalhes do Plano</h1>
      {plano ? (
        <div className="plano-detalhes">
          <h2>{plano.nome_plano}</h2>
          <p>
            <strong>Status:</strong> {plano.status_plano}
          </p>
          <p>
            <strong>Descrição:</strong> {plano.descricao_plano}
          </p>
          <p>
            <strong>Data de Criação:</strong>{' '}
            {new Date(plano.data_criacao_plano).toLocaleDateString()}
          </p>

          <h3>Atividades</h3>
          {atividades.length > 0 ? (
            <ul>
              {atividades.map((atividade) => (
                <li key={atividade.id_atividade}>
                  {atividade.descricao_atividade} - {atividade.status_atividade}
                </li>
              ))}
            </ul>
          ) : (
            <p>Não há atividades vinculadas a este plano.</p>
          )}

          <h3>Recursos</h3>
          {recursos.length > 0 ? (
            <ul>
              {recursos.map((recurso) => (
                <li key={recurso.id_planorecurso}>
                  {recurso.nome_recurso} - {recurso.quantidade_disponivel_recurso}{' '}
                  disponível(is)
                </li>
              ))}
            </ul>
          ) : (
            <p>Não há recursos vinculados a este plano.</p>
          )}
        </div>
      ) : (
        <p>Carregando detalhes do plano...</p>
      )}
    </div>
  );
};

export default PlanoDetalhado;
