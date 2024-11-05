import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './pages/Navbar';
import Login from './pages/Login'; // Atualizado
import SelecionarChamado from './pages/SelecionarChamado'; // Atualizado
import CadastrarSistema from './pages/CadastrarSistema';
import CriarPlano from './pages/CriarPlano';
import CadastrarRecurso from './pages/CadastrarRecurso';


const App = () => {
  return (
    <Router>
     
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/selecionarchamado" element={<SelecionarChamado />} />
        <Route path="/cadastrarsistema" element={<CadastrarSistema />} />
        <Route path="/criarplano" element={<CriarPlano />} />
        <Route path="/cadastrarrecurso" element={<CadastrarRecurso />} />
        {/* Outras rotas aqui */}
      </Routes>
    </Router>
  );
};

export default App;
