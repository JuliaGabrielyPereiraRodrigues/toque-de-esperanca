import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem("nomeUsuario") || "Visitante";
  const [menuAberto, setMenuAberto] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Buscar Campanhas", href: "" },
    { label: "Criar Campanha", href: "" },
    { label: "Meu Painel", href: "" },
    { label: "Sobre o Projeto", href: "" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("emailUsuario");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-area">
          <img src={logo} alt="Logo" className="logo" />
          <span className="titulo">Toque de Esperança</span>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          {menuAberto ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav ${menuAberto ? "ativo" : ""}`}>
          <ul className="nav-lista">
            {navLinks.map((link) => (
              <li key={link.label} className="nav-item">
                <Link
                  to={link.href}
                  className="nav-link"
                  onClick={() => setMenuAberto(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="usuario" title={`Usuário: ${nomeUsuario}`}>
          {nomeUsuario === "Visitante" ? (
            <Link to="/login" className="link-login">
              <FaUserCircle className="icon" />
              {nomeUsuario}
            </Link>
          ) : (
            <>
              <div className="usuario-info">
                <FaUserCircle className="icon" />
                <span className="nome-usuario">{nomeUsuario}</span>
              </div>
              <button className="btn-sair" onClick={handleLogout}>
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
