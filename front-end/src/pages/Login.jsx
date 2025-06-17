import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar token e nome do usuário
        localStorage.setItem("token", data.token);
        localStorage.setItem("nomeUsuario", data.user.name);
        localStorage.setItem("emailUsuario", data.user.email);
        
        // Forçar atualização da página para refletir o login no header
        window.location.href = "/";
      } else {
        setErro(data.message || "Erro ao fazer login");
      }
    } catch (err) {
      setErro("Erro na comunicação com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Entrar</h2>

        <label htmlFor="email" className="login-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Seu email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={carregando}
        />

        <label htmlFor="senha" className="login-label">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          placeholder="Sua senha"
          className="login-input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          disabled={carregando}
        />

        <button type="submit" className="login-button" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        {erro && <div className="erro-mensagem">{erro}</div>}

        <p className="login-textinho">
          Não tem uma conta?{" "}
          <Link to="/registro" className="login-link">
            Registre-se aqui
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;