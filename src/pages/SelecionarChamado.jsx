import React, {useState, useEffect} from 'react';
import { getChamados } from '../service/api';

const SelecionarChamado = () => {
  const [chamados, setChamados] = useState([]);
  const [novoChamado, setNovoChamado] = useState({
    titulo_chamado: '',
    descricao_chamado: '',
    tipo_chamado: '',
    status_chamado: 'Aberto', // Padrão "Aberto"
  });

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

    fetchChamados();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const chamadoAdicionado = await addChamado(novoChamado); // Chama a API para adicionar
      setChamados([...chamados, chamadoAdicionado]); // Atualiza a lista de chamados
      setNovoChamado({ titulo_chamado: '', descricao_chamado: '', tipo_chamado: '', status_chamado: 'Aberto' }); // Limpa o formulário
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
            <option value="Implantação">Implantação</option>
            <option value="Teste">Teste</option>
            <option value="Manutenção">Manutenção</option>
          </select>
        </div>
        <div>
          <button type="submit">Adicionar Chamado</button>
        </div>
      </form>
      <h1>Chamados Abertos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Status</th>
            <th>Descrição</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {chamados.length > 0 ? (
            chamados.map((chamado) => (
              <tr key={chamado.id_chamado}>
                <td>{chamado.id_chamado}</td><td>{chamado.titulo_chamado}</td>
                <td>{chamado.status_chamado}</td><td>{chamado.descricao_chamado}</td>
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
