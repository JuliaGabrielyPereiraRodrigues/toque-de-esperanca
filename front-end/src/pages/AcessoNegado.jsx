import React from "react";
import { Link } from "react-router-dom";
import "./AcessoNegado.css";

const AcessoNegado = () => (
  <div className="acesso-negado-container">
    <h1>401 - Acesso Negado</h1>
    <p>Você precisa estar logado para acessar esta página.</p>
    <Link to="/login">Ir para Login</Link>
  </div>
);

export default AcessoNegado;
