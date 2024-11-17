import React from 'react';
import { Link } from 'react-router-dom'; // Importando Link para navegação

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/home" className="sidebar-btn">
        <i className="fas fa-home"></i>
        <span>Página Principal</span>
      </Link>
      
      <Link to="/developers" className="sidebar-btn">
        <i className="fas fa-laptop-code"></i>
        <span>Desenvolvedores</span>
      </Link>
      
      <Link to="/contact" className="sidebar-btn">
        <i className="fas fa-envelope"></i>
        <span>Contato</span>
      </Link>
    </div>
  );
};

export default Sidebar;
