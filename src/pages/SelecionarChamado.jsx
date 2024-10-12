import React, {useState, useEffect} from 'react';
import { getChamados } from '../service/api';

const SelecionarChamado = () => {
  const [chamados, setChamados] = useState([]);

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

  return (
    <div>
      <h1>Selecionar Chamado</h1>
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
