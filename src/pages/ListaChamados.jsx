import React, { useState, useEffect } from 'react';
import { getChamados } from '../service/api';
import { useNavigate } from 'react-router-dom';

const ListaChamados = () => {
  const [chamados, setChamados] = useState([]);
  const navigate = useNavigate();

  // Função para buscar chamados da API
  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const data = await getChamados();
        // Filtrando apenas os chamados com status "Aberto"
        const chamadosAbertos = data.filter(chamado => chamado.status_chamado === 'Aberto');
        setChamados(chamadosAbertos);
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
      }
    };

    fetchChamados();
  }, []);

  // Função para redirecionar para a página de criação de plano com o ID do chamado
  const handleCriarPlano = (idChamado) => {
    navigate(`/criarplano/${idChamado}`);
  };

  return (
    <div className='container'>
      <h1>Chamados Abertos</h1>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Status</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {chamados.length > 0 ? (
            chamados.map((chamado) => (
              <tr key={chamado.id_chamado}>
                <td>{chamado.titulo_chamado}</td>
                <td>{chamado.status_chamado}</td>
                <td>{chamado.descricao_chamado}</td>
                <td>{chamado.tipo_chamado}</td>
                <td>
                  <button onClick={() => handleCriarPlano(chamado.id_chamado)}>
                    Criar Plano
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum chamado aberto encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaChamados;
