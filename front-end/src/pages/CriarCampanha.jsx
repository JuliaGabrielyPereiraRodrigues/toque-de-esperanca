import React, { useState } from "react";
import "./CriarCampanha.css";

const tiposParticipacao = [
  { label: "Preciso de ajuda", value: "pedido" },
  { label: "Quero doar", value: "doacao" },
];

const tiposCampanha = ["Alimento", "Roupa", "Brinquedo", "Dinheiro", "Outro"];

const CriarCampanha = () => {
  const [form, setForm] = useState({
    tipoCadastro: "",
    titulo: "",
    descricao: "",
    local: "",
    tipo: "",
    imagem: "",
    meta: "",
    dataInicio: "",
    dataFim: "",
    contato: "",
    link: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

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

    const { tipoCadastro, titulo, descricao, local, tipo, imagem } = form;
    const criador = localStorage.getItem("emailUsuario"); 

    if (!tipoCadastro || !titulo || !descricao || !local || !tipo || !imagem || !criador) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    formData.append("criador", criador); 

    try {
      const response = await fetch("http://localhost:3000/campanhas", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao criar campanha.");

      setSucesso("Campanha criada com sucesso!");
      setForm({
        tipoCadastro: "",
        titulo: "",
        descricao: "",
        local: "",
        tipo: "",
        imagem: "",
        meta: "",
        dataInicio: "",
        dataFim: "",
        contato: "",
        link: "",
      });
    } catch (err) {
      setErro("Erro ao criar campanha.");
    }
  };

  const tiposComMeta = ["Alimento", "Dinheiro", "Outro"];
  const mostrarCampoMeta = tiposComMeta.includes(form.tipo);

  return (
    <div className="form-campanha">
      <h2>Nova Campanha / Doação</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Como você quer participar?*
          <select name="tipoCadastro" value={form.tipoCadastro} onChange={handleChange} required>
            <option value="">Selecione</option>
            {tiposParticipacao.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Título*:
          <input type="text" name="titulo" value={form.titulo} onChange={handleChange} required />
        </label>

        <label>
          Descrição*:
          <textarea name="descricao" value={form.descricao} onChange={handleChange} required />
        </label>

        <label>
          Local*:
          <input type="text" name="local" value={form.local} onChange={handleChange} required />
        </label>

        <label>
          Tipo*:
          <select name="tipo" value={form.tipo} onChange={handleChange} required>
            <option value="">Selecione</option>
            {tiposCampanha.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        {mostrarCampoMeta && (
          <label>
            Meta:
            <input
              type="text"
              name="meta"
              placeholder="Ex: 100 cestas básicas"
              value={form.meta}
              onChange={handleChange}
            />
          </label>
        )}

        <label>
          Data de Início:
          <input type="date" name="dataInicio" value={form.dataInicio} onChange={handleChange} />
        </label>

        <label>
          Data de Término:
          <input type="date" name="dataFim" value={form.dataFim} onChange={handleChange} />
        </label>

        <label>
          Contato:
          <input
            type="text"
            name="contato"
            placeholder="Telefone, WhatsApp, etc."
            value={form.contato}
            onChange={handleChange}
          />
        </label>

        <label>
          Link para mais informações:
          <input
            type="url"
            name="link"
            placeholder="https://exemplo.com"
            value={form.link}
            onChange={handleChange}
          />
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
