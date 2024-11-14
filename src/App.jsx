import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './pages/Navbar';
import Login from './pages/Login'; // Atualizado
import CriarChamado from './pages/CriarChamado'; // Atualizado
import CadastrarSistema from './pages/CadastrarSistema';
import CriarPlano from './pages/CriarPlano';
import CadastrarRecurso from './pages/CadastrarRecurso';
import ListaChamados from './pages/ListaChamados';
import Sidebar from './pages/Sidebar';
import CadastrarUsuario from './pages/CadastrarUsuario';

const App = () => {
  return (
   
    
    <div className='container'>
    <Router>
    <Navbar />
    <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrarusuario" element={<CadastrarUsuario />} />
        <Route path="/criarchamado" element={<CriarChamado />} />
        <Route path="/listachamados" element={<ListaChamados />} />
        <Route path="/cadastrarsistema" element={<CadastrarSistema />} />
        <Route path="/criarplano" element={<CriarPlano />} />
        <Route path="/cadastrarrecurso" element={<CadastrarRecurso />} />
        {/* Outras rotas aqui */}
      </Routes>
    </Router>
    </div>
    
  );
};

export default App;
