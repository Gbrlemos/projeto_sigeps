// src/pages/CriarPlano.jsx
import React, { useState } from 'react';
import { addPlano } from '../service/api';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CriarPlano = () => {
  const navigate = useNavigate();
  const [nomePlano, setNomePlano] = useState('');
  const [descricaoPlano, setDescricaoPlano] = useState('');
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [statusPlano, setStatusPlano] = useState('Ativo');
  const [atividades, setAtividades] = useState([]);
  const [novaAtividade, setNovaAtividade] = useState({ descricao: '', dataInicio: null, dataFim: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Cria o objeto do plano sem atividades ainda
    const novoPlano = {
      nome_plano: nomePlano,
      descricao_plano: descricaoPlano,
      data_inicio: dataInicio,
      data_fim: dataFim,
      status_plano: statusPlano,
    };
  
    try {
      // Passo 1: Cria o plano no banco e obtém o id gerado
      const planoCriado = await addPlano(novoPlano); // `addPlano` deve retornar o objeto com `id_plano`
      const planoId = planoCriado.id_plano;
  
      // Passo 2: Associa o `id_plano` a cada atividade
      const atividadesComIdPlano = atividades.map(atividade => ({
        ...atividade,
        id_plano: planoId
      }));
  
      // Passo 3: Salva todas as atividades com o `id_plano` associado
      await Promise.all(atividadesComIdPlano.map(addAtividade));
  
      alert('Plano e atividades criados com sucesso!');
      navigate('/planos'); // Redireciona após a criação com sucesso
    } catch (error) {
      console.error('Erro ao criar o plano ou atividades:', error);
      alert('Erro ao criar o plano ou atividades.');
    }
  };

  const handleAddAtividade = () => {
    setAtividades([...atividades, novaAtividade]);
    setNovaAtividade({ descricao: '', dataInicio: null, dataFim: null });
  };

  return (
    <div className="page-container">
      
      {/* Div para criar novo plano */}
      <div className="page">
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
              placeholderText="Selecione a data de início"
              required
            />
          </div>
          <div>
            <label>Data de Fim:</label>
            <DatePicker
              selected={dataFim}
              onChange={(date) => setDataFim(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione a data de fim"
              required
            />
          </div>
          
          <button type="submit">Criar Plano</button>
        </form>
      </div>

      {/* Div para adicionar nova atividade */}
      <div className="page">
      <h2>Adicionar Atividade</h2>
      <form onSubmit={handleSubmit}>
        
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
            placeholderText="Selecione a data de início"
            required
          />
        </div>
        <div>
          <label>Data de Fim:</label>
          <DatePicker
            selected={novaAtividade.dataFim}
            onChange={(date) => setNovaAtividade({ ...novaAtividade, dataFim: date })}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecione a data de fim"
            required
          />
        </div>
        <button type="button" onClick={handleAddAtividade}>Adicionar Atividade</button>
        </form>
      </div>

      {/* Div para lista de atividades */}
      <div className="page">
        <h2>Lista de Atividades</h2>
        <ul>
          {atividades.map((atividade, index) => (
            <li key={index}>
              <p><strong>Descrição:</strong> {atividade.descricao}</p>
              <p><strong>Data Início:</strong> {atividade.dataInicio?.toLocaleDateString()}</p>
              <p><strong>Data Fim:</strong> {atividade.dataFim?.toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CriarPlano;
