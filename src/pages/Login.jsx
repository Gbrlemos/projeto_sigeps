// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate do react-router-dom

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    // Redireciona para a página de Selecionar Chamado
    navigate('/selecionarchamado');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e); // Chama a função de login ao pressionar Enter
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Usuário</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress} // Adiciona o evento de pressionar tecla
        />
        
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} // Adiciona o evento de pressionar tecla
        />
        
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
