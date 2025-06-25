import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetalhesCampanha.css";

const DetalhesCampanha = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campanha, setCampanha] = useState(null);
  const [erro, setErro] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [autorComentario, setAutorComentario] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/campanhas")
      .then((res) => res.json())
      .then((data) => {
        const encontrada = data.find((c) => c._id === id);
        if (encontrada) setCampanha(encontrada);
        else setErro("Campanha não encontrada.");
      })
      .catch(() => setErro("Erro ao buscar campanha."));

    carregarComentarios();
  }, [id]);

  const carregarComentarios = async () => {
    try {
      const res = await fetch(`http://localhost:3000/comentarios/${id}`);
      const data = await res.json();
      setComentarios(data);
    } catch {
      console.error("Erro ao carregar comentários.");
    }
  };

  const enviarComentario = async () => {
    if (!autorComentario || !novoComentario) return;

    try {
      const res = await fetch("http://localhost:3000/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campanhaId: id,
          autor: autorComentario,
          texto: novoComentario,
        }),
      });

      if (res.ok) {
        setNovoComentario("");
        carregarComentarios();
      } else {
        alert("Erro ao enviar comentário.");
      }
    } catch {
      alert("Erro na conexão.");
    }
  };

  const marcarComoConcluida = async () => {
    try {
      const response = await fetch(`http://localhost:3000/campanhas/${id}/concluir`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error();
      alert("Campanha marcada como concluída!");
      navigate("/");
    } catch {
      alert("Erro ao marcar como concluída.");
    }
  };

  if (erro) return <p>{erro}</p>;
  if (!campanha) return <p>Carregando...</p>;

  return (
    <div className="detalhes-campanha">
      <h1>{campanha.titulo}</h1>
      <img
        src={`http://localhost:3000/uploads/${campanha.imagem}`}
        alt="Imagem da campanha"
        style={{ maxWidth: "100%", borderRadius: "8px" }}
      />
      <p><strong>Descrição:</strong> {campanha.descricao}</p>
      <p><strong>Local:</strong> {campanha.local}</p>
      <p><strong>Categoria:</strong> {campanha.tipo}</p>
      <p><strong>Status:</strong> {campanha.status}</p>
      <p><strong>Data de criação:</strong> {new Date(campanha.criadoEm).toLocaleDateString()}</p>

      {campanha.status === "ativa" && (
        <button onClick={marcarComoConcluida} style={{ marginTop: "20px" }}>
          Marcar como concluída
        </button>
      )}

      <button onClick={() => navigate(`/chat?campanha=${id}`)} style={{ marginTop: "10px" }}>
        Conversar com o organizador
      </button>

      {/* COMENTÁRIOS */}
      <div className="secao-comentarios">
        <h3>Comentários</h3>

        <input
          type="text"
          placeholder="Seu nome"
          value={autorComentario}
          onChange={(e) => setAutorComentario(e.target.value)}
          className="input-comentario"
        />

        <textarea
          placeholder="Escreva seu comentário..."
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
          rows={3}
          className="textarea-comentario"
        />

        <button onClick={enviarComentario} className="btn-enviar-comentario">
          Enviar comentário
        </button>

        <div className="lista-comentarios">
          {comentarios.length === 0 && <p>Sem comentários ainda.</p>}

          {comentarios.map((comentario) => {
            const ehCriador = comentario.autor === campanha.tipoCadastro;

            return (
              <div
                key={comentario._id}
                className={`comentario ${ehCriador ? "comentario-criador" : ""}`}
              >
                <div className="comentario-topo">
                  <strong>{comentario.autor}</strong>
                  <span>
                    {new Date(comentario.criadoEm).toLocaleDateString()} -{" "}
                    {new Date(comentario.criadoEm).toLocaleTimeString()}
                  </span>
                </div>
                <p>{comentario.texto}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetalhesCampanha;
