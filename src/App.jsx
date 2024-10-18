import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './pages/Navbar';
import Login from './pages/Login'; // Atualizado
import SelecionarChamado from './pages/SelecionarChamado'; // Atualizado
import CadastrarSistema from './pages/CadastrarSistema';


const App = () => {
  return (
    <Router>
     
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/selecionarchamado" element={<SelecionarChamado />} />
        <Route path="/cadastrarsistema" element={<CadastrarSistema />} />
        {/* Outras rotas aqui */}
      </Routes>
    </Router>
  );
};

export default App;
