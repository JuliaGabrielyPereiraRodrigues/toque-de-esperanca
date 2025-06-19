import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import CriarCampanha from "./pages/CriarCampanha";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/criar-campanha" element={<CriarCampanha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
