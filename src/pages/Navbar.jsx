import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Login">Login</Link> {/* Página inicial */}
        </li>
        <li>
          <Link to="/SelecionarChamado">Chamados</Link> {/* Página de chamados */}
        </li>
        <li>
          <Link to="/CadastrarSistema">Sistemas</Link> {/* Página de sistemas */}
        </li>
        {/* Adicione mais links conforme necessário */}
        <li>
          <Link to="/nova-pagina">Nova Página</Link> {/* Nova página que você criar */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
