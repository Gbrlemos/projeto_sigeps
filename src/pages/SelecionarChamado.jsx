import React, { useState, useEffect } from 'react';
import { addChamado, getChamados } from '../service/api'; // Certifique-se de que getSistemas está corretamente importado

const SelecionarChamado = () => {
  const [chamados, setChamados] = useState([]);
  
  // Estado para armazenar o novo chamado
  const [novoChamado, setNovoChamado] = useState({
    titulo_chamado: '',
    descricao_chamado: '',
    tipo_chamado: '',  // Combobox para tipo de chamado
    status_chamado: 'Aberto', // Status padrão definido como "Aberto"
    id_sistema: '' // Adicionando o id_sistema
  });

  // Função para buscar chamados da API
  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const data = await getChamados();
        setChamados(data);
        console.log("Chamados recebidos:", data);
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
      }
    };

    fetchChamados(); // Apenas buscando os chamados
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do submit
    try {
      const chamadoAdicionado = await addChamado(novoChamado); // Chama a API para adicionar o chamado
      setChamados([...chamados, chamadoAdicionado]); // Atualiza a lista de chamados
      setNovoChamado({ titulo_chamado: '', descricao_chamado: '', tipo_chamado: '', status_chamado: 'Aberto', id_sistema: '' }); // Limpa o formulário
      console.log("Chamado adicionado:", chamadoAdicionado);
    } catch (error) {
      console.error("Erro ao adicionar chamado:", error);
    }
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (event) => {
    const { name, value } = event.target; 
    setNovoChamado({ ...novoChamado, [name]: value });
  };

  return (
    <div>
      <h1>Abrir Novo Chamado</h1>
      {/* Formulário para adicionar novo chamado */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo_chamado">Título:</label>
          <input
            type="text"
            id="titulo_chamado"
            name="titulo_chamado"
            value={novoChamado.titulo_chamado}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="descricao_chamado">Descrição:</label>
          <input
            type="text"
            id="descricao_chamado"
            name="descricao_chamado"
            value={novoChamado.descricao_chamado}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tipo_chamado">Tipo:</label>
          <select
            id="tipo_chamado"
            name="tipo_chamado"
            value={novoChamado.tipo_chamado}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecione um tipo</option>
            <option value="Implantação">Implantação</option>
            <option value="Teste">Teste</option>
            <option value="Manutenção">Manutenção</option>
          </select>
        </div>
        <div>
          <label htmlFor="id_sistema">ID do Sistema:</label>
          <input
            type="text" // Usando um campo de texto para permitir que o usuário digite o ID do sistema
            id="id_sistema"
            name="id_sistema"
            value={novoChamado.id_sistema}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Adicionar Chamado</button>
        </div>
      </form>
      
      <h1>Chamados Abertos</h1>
      <table>
        <thead>
          <tr>
            
            <th>Título</th>
            <th>Status</th>
            <th>Descrição</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {chamados.length > 0 ? (
            chamados.map((chamado) => (
              <tr key={chamado.id_chamado}> {/* Aqui está a correção */}
                
                <td>{chamado.titulo_chamado}</td>
                <td>{chamado.status_chamado}</td>
                <td>{chamado.descricao_chamado}</td>
                <td>{chamado.tipo_chamado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum chamado encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SelecionarChamado;
