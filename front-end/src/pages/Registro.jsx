import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registro.css";

const Registro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setSucesso(data.message || "Usuário registrado com sucesso!");
        setName("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErro(data.message || "Erro ao tentar registrar.");
      }
    } catch (err) {
      setErro("Erro na comunicação com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2 className="registro-title">Criar Conta</h2>

        <label className="registro-label">Nome</label>
        <input
          type="text"
          placeholder="Seu nome"
          className="registro-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={carregando}
        />

        <label className="registro-label">Email</label>
        <input
          type="email"
          placeholder="Seu email"
          className="registro-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={carregando}
        />

        <label className="registro-label">Senha</label>
        <input
          type={mostrarSenha ? "text" : "password"}
          placeholder="Sua senha"
          className="registro-input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          disabled={carregando}
        />

        <label className="registro-label">Confirmar Senha</label>
        <input
          type={mostrarSenha ? "text" : "password"}
          placeholder="Confirme sua senha"
          className="registro-input"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
          disabled={carregando}
        />

        {/* ✅ Somente essa opção controla visibilidade da senha */}
        <div style={{ margin: "10px 0", fontSize: "0.9rem" }}>
          <label>
            <input
              type="checkbox"
              checked={mostrarSenha}
              onChange={() => setMostrarSenha(!mostrarSenha)}
              disabled={carregando}
            />
            &nbsp;Mostrar senha
          </label>
        </div>

        <button type="submit" className="registro-button" disabled={carregando}>
          {carregando ? "Registrando..." : "Registrar"}
        </button>

        {erro && <div className="erro-mensagem">{erro}</div>}
        {sucesso && <div className="sucesso-mensagem">{sucesso}</div>}

        <p className="registro-textinho">
          Já tem uma conta?{" "}
          <Link to="/login" className="registro-link">Faça login aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default Registro;
