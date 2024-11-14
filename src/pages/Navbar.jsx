import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo "Sigeps" no canto esquerdo */}
      <div className="logo">
        Sigeps
      </div>
      
      {/* Links de Login e Cadastrar no canto direito */}
      <div className="auth-buttons">
        <a href="/login">Login</a>
        <a href="/cadastro">Cadastrar</a>
      </div>
    </div>
  );
};

export default Navbar;
