import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetalhesCampanha.css";

const tiposCampanha = ["Alimento", "Roupa", "Brinquedo", "Dinheiro", "Outro"];
const tiposComMeta = ["Alimento", "Dinheiro", "Outro"];

const DetalhesCampanha = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campanha, setCampanha] = useState(null);
  const [formEdit, setFormEdit] = useState({});
  const [modoEdicao, setModoEdicao] = useState(false);
  const [erro, setErro] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");

  const emailUsuario = localStorage.getItem("emailUsuario");
  const nomeUsuario = localStorage.getItem("nomeUsuario");

  useEffect(() => {
    fetch(`http://localhost:3000/campanhas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCampanha(data);
          setFormEdit({
            titulo: data.titulo,
            descricao: data.descricao,
            local: data.local,
            tipo: data.tipo,
            meta: data.meta || "",
            dataInicio: data.dataInicio ? data.dataInicio.split("T")[0] : "",
            dataFim: data.dataFim ? data.dataFim.split("T")[0] : "",
            contato: data.contato || "",
            link: data.link || "",
          });
        } else {
          setErro("Campanha não encontrada.");
        }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEdit({ ...formEdit, [name]: value });
  };

  const salvarEdicao = async () => {
    try {
      const res = await fetch(`http://localhost:3000/campanhas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEdit),
      });

      if (res.ok) {
        const data = await res.json();
        setCampanha(data.campanha);
        setModoEdicao(false);
        alert("Campanha atualizada com sucesso!");
      } else {
        alert("Erro ao atualizar campanha.");
      }
    } catch {
      alert("Erro na conexão.");
    }
  };

  const enviarComentario = async () => {
    const autor = nomeUsuario || emailUsuario;
    if (!emailUsuario || !autor || !novoComentario.trim()) {
      alert("Você precisa estar logado e preencher o comentário.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campanhaId: id,
          autor,
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

  const excluirCampanha = async () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta campanha?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:3000/campanhas/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error();
      alert("Campanha excluída com sucesso.");
      navigate("/");
    } catch {
      alert("Erro ao excluir campanha.");
    }
  };

  if (erro) return <p>{erro}</p>;
  if (!campanha) return <p>Carregando...</p>;

  const ehCriador = campanha.criador === emailUsuario;
  const mostrarCampoMeta = tiposComMeta.includes(formEdit.tipo);

  return (
    <div className="detalhes-campanha">
      {modoEdicao ? (
        <div className="form-edicao">
          <label>
            Título:
            <input type="text" name="titulo" value={formEdit.titulo} onChange={handleChange} />
          </label>

          <label>
            Descrição:
            <textarea name="descricao" value={formEdit.descricao} onChange={handleChange} rows={4} />
          </label>

          <label>
            Local:
            <input type="text" name="local" value={formEdit.local} onChange={handleChange} />
          </label>

          <label>
            Tipo:
            <select name="tipo" value={formEdit.tipo} onChange={handleChange}>
              <option value="">Selecione</option>
              {tiposCampanha.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>

          {mostrarCampoMeta && (
            <label>
              Meta:
              <input type="text" name="meta" value={formEdit.meta} onChange={handleChange} />
            </label>
          )}

          <label>
            Data de Início:
            <input type="date" name="dataInicio" value={formEdit.dataInicio} onChange={handleChange} />
          </label>

          <label>
            Data de Fim:
            <input type="date" name="dataFim" value={formEdit.dataFim} onChange={handleChange} />
          </label>

          <label>
            Contato:
            <input type="text" name="contato" value={formEdit.contato} onChange={handleChange} />
          </label>

          <label>
            Link:
            <input type="text" name="link" value={formEdit.link} onChange={handleChange} />
          </label>
        </div>
      ) : (
        <>
          <h1>{campanha.titulo}</h1>
          <img
            src={`http://localhost:3000/uploads/${campanha.imagem}`}
            alt="Imagem da campanha"
            style={{ maxWidth: "400px", display: "block", margin: "0 auto", borderRadius: "8px" }}
          />
          <p><strong>Descrição:</strong> {campanha.descricao}</p>
          <p><strong>Local:</strong> {campanha.local}</p>
          <p><strong>Categoria:</strong> {campanha.tipo}</p>
          <p><strong>Status:</strong> {campanha.status}</p>
          <p><strong>Data de criação:</strong> {new Date(campanha.criadoEm).toLocaleDateString()}</p>
          {campanha.meta && <p><strong>Meta:</strong> {campanha.meta}</p>}
          {campanha.dataInicio && <p><strong>Início:</strong> {new Date(campanha.dataInicio).toLocaleDateString()}</p>}
          {campanha.dataFim && <p><strong>Fim:</strong> {new Date(campanha.dataFim).toLocaleDateString()}</p>}
          {campanha.contato && <p><strong>Contato:</strong> {campanha.contato}</p>}
          {campanha.link && (
            <p>
              <strong>Link:</strong>{" "}
              <a href={campanha.link} target="_blank" rel="noreferrer">{campanha.link}</a>
            </p>
          )}
        </>
      )}

      {ehCriador && campanha.status === "ativa" && (
        <div style={{ marginTop: "20px" }}>
          {modoEdicao ? (
            <>
              <button onClick={salvarEdicao}>Salvar alterações</button>
              <button onClick={() => setModoEdicao(false)} style={{ marginLeft: "10px" }}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button onClick={marcarComoConcluida}>Marcar como concluída</button>
              <button onClick={() => setModoEdicao(true)} style={{ marginLeft: "10px" }}>
                Editar campanha
              </button>
              <button
                onClick={excluirCampanha}
                style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}
              >
                Excluir campanha
              </button>
            </>
          )}
        </div>
      )}

      {emailUsuario && !ehCriador && campanha.criador && (
        <button onClick={() => navigate(`/chat?campanha=${id}&com=${campanha.criador}`)} style={{ marginTop: "10px" }}>
          Conversar com o organizador
        </button>
      )}

      {!modoEdicao && (
        <div className="secao-comentarios">
          <h3>Comentários</h3>
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
            {comentarios.map((comentario) => (
              <div
                key={comentario._id}
                className={`comentario ${comentario.autor === nomeUsuario ? "comentario-criador" : ""}`}
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalhesCampanha;
