import React from "react";
import { Navigate } from "react-router-dom";

const RotaPrivada = ({ children }) => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  return usuarioLogado ? children : <Navigate to="/acesso-negado" />;
};

export default RotaPrivada;
