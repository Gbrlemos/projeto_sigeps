import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useLocation para receber o id_chamado
import { addPlano, getRecursos, addAtividade, addPlanoRecurso } from '../service/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash } from 'react-icons/fa';

const CriarPlano = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Captura o ID do chamado da URL
  const id_chamado = id; // Define id_chamado a partir de useParams

  const [nomePlano, setNomePlano] = useState('');
  const [descricaoPlano, setDescricaoPlano] = useState('');
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [statusPlano, setStatusPlano] = useState('Ativo');
  const [atividades, setAtividades] = useState([]);
  const [novaAtividade, setNovaAtividade] = useState({ descricao: '', dataInicio: null, dataFim: null });
  const [recursos, setRecursos] = useState([]);
  const [recursosSelecionados, setRecursosSelecionados] = useState([]);

  useEffect(() => {
    fetchRecursos();
  }, []);

  const fetchRecursos = async () => {
    try {
      const data = await getRecursos();
      setRecursos(data.map(recurso => ({ ...recurso, quantidadeReservada: 0 })));
    } catch (error) {
      console.error('Erro ao buscar recursos', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoPlano = {
      nome_plano: nomePlano,
      descricao_plano: descricaoPlano,
      data_inicio: dataInicio,
      data_fim: dataFim,
      status_plano: statusPlano,
      id_chamado, // Associar o plano ao chamado recebido
    };

    try {
      const planoCriado = await addPlano(novoPlano);
      const planoId = planoCriado.id_plano;

      const atividadesComIdPlano = atividades.map(atividade => ({
        ...atividade,
        id_plano: planoId,
      }));
      await Promise.all(atividadesComIdPlano.map(addAtividade));

      await Promise.all(
        recursosSelecionados.map(async recurso => {
          if (recurso.quantidadeReservada > 0) {
            await addPlanoRecurso({
              id_plano: planoId,
              id_recurso: recurso.id_recurso,
            });
          }
        })
      );

      alert('Plano, atividades e recursos criados com sucesso!');
      navigate('/planos');
    } catch (error) {
      console.error('Erro ao criar o plano ou atividades:', error);
      alert('Erro ao criar o plano ou atividades.');
    }
  };

  const handleAddAtividade = () => {
    if (novaAtividade.descricao && novaAtividade.dataInicio && novaAtividade.dataFim) {
      setAtividades([...atividades, novaAtividade]);
      setNovaAtividade({ descricao: '', dataInicio: null, dataFim: null });
    } else {
      alert('Por favor, preencha todos os campos da atividade.');
    }
  };

  const handleDeleteAtividade = (index) => {
    const atividadesAtualizadas = atividades.filter((_, i) => i !== index);
    setAtividades(atividadesAtualizadas);
  };

  const handleRecursoSelecionado = (index, quantidade) => {
    const novosRecursos = [...recursos];
    novosRecursos[index].quantidadeReservada = quantidade;
    setRecursos(novosRecursos);

    setRecursosSelecionados(novosRecursos.filter(recurso => recurso.quantidadeReservada > 0));
  };

  return (
    <div className="page-container">
      {id_chamado ? ( // Exibe uma mensagem de confirmação do chamado associado
        <div className="info-box">
          <p>Plano será associado ao chamado ID: {id_chamado}</p>
        </div>
      ) : (
        <div className="info-box">
          <p>Nenhum chamado foi associado a este plano.</p>
        </div>
      )}

      {/* Restante do código para adicionar atividades, recursos e dados do plano */}
      {/* Mantive igual ao anterior */}
      <div className="sidetoside">
        <h2>Adicionar Atividade</h2>
        <div className="info-box">
          Adicione atividades à lista de atividades antes de criar o plano. Adiciona e remova quantas quiser.
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Descrição da Atividade:</label>
            <input
              type="text"
              value={novaAtividade.descricao}
              onChange={(e) => setNovaAtividade({ ...novaAtividade, descricao: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Data de Início:</label>
            <DatePicker
              selected={novaAtividade.dataInicio}
              onChange={(date) => setNovaAtividade({ ...novaAtividade, dataInicio: date })}
              dateFormat="dd/MM/yyyy"
              required
            />
          </div>
          <div>
            <label>Data de Fim:</label>
            <DatePicker
              selected={novaAtividade.dataFim}
              onChange={(date) => setNovaAtividade({ ...novaAtividade, dataFim: date })}
              dateFormat="dd/MM/yyyy"
              required
            />
          </div>
          <button type="button" onClick={handleAddAtividade}>
            Adicionar Atividade
          </button>
        </form>
      </div>

      <div className="sidetoside">
        <h3>Lista de Atividades</h3>
        <ul>
          {atividades.map((atividade, index) => (
            <li key={index}>
              <strong>Descrição:</strong> {atividade.descricao} | 
              <strong> Início:</strong> {atividade.dataInicio.toLocaleDateString()} | 
              <strong> Fim:</strong> {atividade.dataFim.toLocaleDateString()}
              <button onClick={() => handleDeleteAtividade(index)} style={{ marginLeft: '10px', color: 'white' }}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidetoside">
        <h2>Recursos Disponíveis</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Estoque</th>
              <th>Quantidade a Reservar</th>
            </tr>
          </thead>
          <tbody>
            {recursos.length > 0 ? (
              recursos.map((recurso, index) => (
                <tr key={recurso.id_recurso}>
                  <td>{recurso.nome_recurso}</td>
                  <td>{recurso.quantidade_disponivel}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max={recurso.quantidade_disponivel}
                      value={recurso.quantidadeReservada}
                      onChange={(e) => handleRecursoSelecionado(index, Number(e.target.value))}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhum recurso encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="sidetoside">
        <h2>Dados do Plano</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome do Plano:</label>
            <input
              type="text"
              value={nomePlano}
              onChange={(e) => setNomePlano(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descrição:</label>
            <textarea
              value={descricaoPlano}
              onChange={(e) => setDescricaoPlano(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Data de Início:</label>
            <DatePicker
              selected={dataInicio}
              onChange={(date) => setDataInicio(date)}
              dateFormat="dd/MM/yyyy"
              required
            />
          </div>
          <div>
            <label>Data de Fim:</label>
            <DatePicker
              selected={dataFim}
              onChange={(date) => setDataFim(date)}
              dateFormat="dd/MM/yyyy"
              required
            />
          </div>
          <button type="submit">Criar Plano</button>
        </form>
      </div>
    </div>
  );
};

export default CriarPlano;
