import React, { useState } from 'react';
import { addSistema } from '../service/api'; // Verifique se a importação está correta

const CadastrarSistema = () => {
  // Estado para armazenar o novo sistema
  const [novoSistema, setNovoSistema] = useState({
    nome_sistema: '',
    tipo_sistema: '',
    versao_sistema: '1.0', // Versão padrão inicial
  });

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do submit
    try {
      // Chama a API para adicionar o sistema
      const sistemaAdicionado = await addSistema(novoSistema);
      console.log("Sistema adicionado:", sistemaAdicionado);
      
      // Limpa o formulário após a submissão
      setNovoSistema({ nome_sistema: '', tipo_sistema: '', versao_sistema: '1.0' });
    } catch (error) {
      console.error("Erro ao adicionar sistema:", error);
    }
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNovoSistema({ ...novoSistema, [name]: value });
  };

  return (
    <div>
      <h1>Cadastrar Novo Sistema</h1>
      {/* Formulário para adicionar novo sistema */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome_sistema">Nome do Sistema:</label>
          <input
            type="text"
            id="nome_sistema"
            name="nome_sistema"
            value={novoSistema.nome_sistema}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tipo_sistema">Tipo do Sistema:</label>
          <input
            type="text"
            id="tipo_sistema"
            name="tipo_sistema"
            value={novoSistema.tipo_sistema}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Adicionar Sistema</button>
        </div>
      </form>
    </div>
  );
};

export default CadastrarSistema;
