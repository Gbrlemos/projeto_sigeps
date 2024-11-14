import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUsuario } from '../service/api'; // Função para adicionar um usuário via API

const CadastrarUsuario = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Cliente'); // Por padrão, define como 'Cliente'
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cria um objeto com os dados do novo usuário
    const novoUsuario = {
      nome_usuario: nome,
      cpf_usuario: cpf,
      email_usuario: email,
      tel_usuario: telefone,
      login_usuario: login,
      senha_usuario: senha,
      tipo_usuario: tipoUsuario,
    };

    try {
      // Chama a função para adicionar o novo usuário
      await addUsuario(novoUsuario);
      setSucesso('Usuário cadastrado com sucesso!');
      setErro('');
      // Redireciona para a página de login
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redireciona após 2 segundos
    } catch (err) {
      setErro('Erro ao cadastrar o usuário. Tente novamente!');
      setSucesso('');
    }
  };

  return (
    <div className="container">
      <h1>Cadastrar Novo Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tipoUsuario">Tipo de Usuário</label>
          <select
            id="tipoUsuario"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="Cliente">Cliente</option>
            <option value="Triagem">Triagem</option>
            <option value="Especialista">Especialista</option>
          </select>
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}
    </div>
  );
};

export default CadastrarUsuario;
