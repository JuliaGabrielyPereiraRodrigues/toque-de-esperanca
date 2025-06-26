import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import BuscarCampanha from "./pages/BuscarCampanha";
import CriarCampanha from "./pages/CriarCampanha";
import AcessoNegado from "./pages/AcessoNegado";
import Sobre from "./pages/Sobre";
import DetalhesCampanha from "./pages/DetalhesCampanha"; // <-- aqui

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/buscar-campanhas" element={<BuscarCampanha />} />
        <Route path="/criar-campanha" element={<CriarCampanha />} />
        <Route path="/acesso-negado" element={<AcessoNegado />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/campanha/:id" element={<DetalhesCampanha />} /> {/* <-- nova rota */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
