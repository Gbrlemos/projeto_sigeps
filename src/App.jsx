import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './pages/Navbar';
import Login from './pages/Login'; // Atualizado
import SelecionarChamado from './pages/SelecionarChamado'; // Atualizado
import CadastrarSistema from './pages/CadastrarSistema';
import CriarPlano from './pages/CriarPlano';
import CadastrarRecurso from './pages/CadastrarRecurso';
import ChamadosAdm from './pages/ChamadosAdm';
import Sidebar from './pages/Sidebar';

const App = () => {
  return (
    <div>
    <Navbar />
    <Sidebar />
    <div>
    <Router>
     
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/selecionarchamado" element={<SelecionarChamado />} />
        <Route path="/chamadosadm" element={<ChamadosAdm />} />
        <Route path="/cadastrarsistema" element={<CadastrarSistema />} />
        <Route path="/criarplano" element={<CriarPlano />} />
        <Route path="/cadastrarrecurso" element={<CadastrarRecurso />} />
        {/* Outras rotas aqui */}
      </Routes>
    </Router>
    </div>
    </div>
  );
};

export default App;
