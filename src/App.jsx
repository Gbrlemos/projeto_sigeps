import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Atualizado
import SelecionarChamado from './pages/SelecionarChamado'; // Atualizado
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/selecionarchamado" element={<SelecionarChamado />} />
        {/* Outras rotas aqui */}
      </Routes>
    </Router>
  );
};

export default App;
