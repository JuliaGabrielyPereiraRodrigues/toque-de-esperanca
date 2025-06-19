import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "./CriarCampanha.css";

const tiposCadastro = [
  { label: "Preciso de ajuda", value: "pedido" },
  { label: "Quero doar", value: "doacao" },
];

const tiposCampanha = ["Alimento", "Roupa", "Brinquedo", "Dinheiro", "Outro"];

const CriarCampanha = () => {
  // const navigate = useNavigate();
  const [form, setForm] = useState({
    tipoCadastro: "",
    titulo: "",
    descricao: "",
    local: "",
    tipo: "",
    imagem: "",
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Verifica se usuário está logado
  /*const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Nova Campanha / Doação</h2>
        <p style={{ color: "red" }}>
          Você precisa estar logado para criar uma campanha.
        </p>
      </div>
    );
  }*/

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagem") {
      setForm({ ...form, imagem: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (
      !form.tipoCadastro ||
      !form.titulo ||
      !form.descricao ||
      !form.local ||
      !form.tipo ||
      !form.imagem
    ) {
      setErro("Preencha todos os campos obrigatórios, incluindo a imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("tipoCadastro", form.tipoCadastro);
    formData.append("titulo", form.titulo);
    formData.append("descricao", form.descricao);
    formData.append("local", form.local);
    formData.append("tipo", form.tipo);
    formData.append("imagem", form.imagem);

    try {
      const response = await fetch("http://localhost:3000/campanhas", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Erro ao criar campanha.");
      }
      setSucesso("Campanha criada com sucesso!");
      setForm({
        tipoCadastro: "",
        titulo: "",
        descricao: "",
        local: "",
        tipo: "",
        imagem: "",
      });
    } catch {
      setErro("Erro ao criar campanha.");
    }
  };

  return (
    <div className="form-campanha">
      <h2>Nova Campanha / Doação</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tipo de cadastro*:
          <select
            name="tipoCadastro"
            value={form.tipoCadastro}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {tiposCadastro.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Título*:
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descrição*:
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Local*:
          <input
            type="text"
            name="local"
            value={form.local}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Tipo*:
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {tiposCampanha.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label>
          Imagem*:
          <input
            type="file"
            name="imagem"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>
        {erro && <div className="erro">{erro}</div>}
        {sucesso && <div className="sucesso">{sucesso}</div>}
        <button type="submit" className="btn-criar-campanha">
          Criar Campanha
        </button>
      </form>
    </div>
  );
};

export default CriarCampanha;
