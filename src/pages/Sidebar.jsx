import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button className="sidebar-btn">
        <i className="fas fa-home"></i>
        <span>Página Principal</span>
      </button>
      <button className="sidebar-btn">
        <i className="fas fa-laptop-code"></i>
        <span>Desenvolvedores</span>
      </button>
      <button className="sidebar-btn">
        <i className="fas fa-envelope"></i>
        <span>Contato</span>
      </button>
    </div>
  );
};

export default Sidebar;
