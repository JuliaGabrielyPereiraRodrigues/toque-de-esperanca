import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registro.css";

const Registro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [accountType, setAccountType] = useState("ONG");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setCarregando(true);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: senha, accountType }),
      });

      const data = await response.json();

      if (response.ok) {
        setSucesso(data.message || "Usuário registrado com sucesso!");
        setName("");
        setEmail("");
        setSenha("");
        setAccountType("ONG");
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
          type="password"
          placeholder="Sua senha"
          className="registro-input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          disabled={carregando}
        />

        <label className="registro-label">Tipo de Conta</label>
        <select
          className="registro-input"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          required
          disabled={carregando}
        >
          <option value="ONG">ONG</option>
          <option value="Doador">Doador</option>
        </select>

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