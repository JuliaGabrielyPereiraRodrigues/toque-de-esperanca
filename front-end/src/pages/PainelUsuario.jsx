import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PainelUsuario.css";

const PainelUsuario = () => {
  const [campanhas, setCampanhas] = useState([]);
  const [conversas, setConversas] = useState([]);
  const [notificacoesRecentes, setNotificacoesRecentes] = useState([]);
  const [mostrarCampanhas, setMostrarCampanhas] = useState(false);
  const [nomesUsuarios, setNomesUsuarios] = useState({});
  const [carregando, setCarregando] = useState(true);

  const emailUsuario = localStorage.getItem("emailUsuario");
  const nomeUsuario = localStorage.getItem("nomeUsuario");
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resCampanhas = await fetch("http://localhost:3000/campanhas");
        const dataCampanhas = await resCampanhas.json();
        const minhas = dataCampanhas.filter((c) => c.criador === emailUsuario);
        setCampanhas(minhas);

        await carregarConversas();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [emailUsuario]);

  const carregarConversas = async () => {
    try {
      const resConversas = await fetch(`http://localhost:3000/chat/por-criador/${emailUsuario}`);
      const dataConversas = await resConversas.json();
      setConversas(dataConversas);

      const resNotificacoes = await fetch(`http://localhost:3000/chat/notificacoes/${emailUsuario}`);
      const dataNotificacoes = await resNotificacoes.json();
      setNotificacoesRecentes(dataNotificacoes);

      const emails = [...new Set([
        ...dataConversas.map((c) => c.remetente),
        ...dataNotificacoes.map((n) => n.remetente)
      ])].filter(email => email !== emailUsuario);

      const nomes = {};
      await Promise.all(
        emails.map(async (email) => {
          try {
            const res = await fetch(`http://localhost:3000/usuarios/email/${email}`);
            const data = await res.json();
            nomes[email] = data.nome || email;
          } catch {
            nomes[email] = email;
          }
        })
      );
      setNomesUsuarios(nomes);
    } catch (error) {
      console.error("Erro ao carregar conversas:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const responderMensagem = async (msg) => {
    try {
      await fetch("http://localhost:3000/chat/marcar-como-lida", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campanhaId: msg.campanhaId,
          remetente: msg.remetente,
          destinatario: emailUsuario,
        }),
      });

      setNotificacoesRecentes((prev) =>
        prev.filter((m) => 
          !(m.campanhaId === msg.campanhaId && m.remetente === msg.remetente)
        )
      );

      navigate(`/chat?campanha=${msg.campanhaId}&com=${msg.remetente}`);
    } catch (error) {
      console.error("Erro ao marcar mensagens como lidas:", error);
      navigate(`/chat?campanha=${msg.campanhaId}&com=${msg.remetente}`);
    }
  };

  const abrirConversa = (conversa) => {
    navigate(`/chat?campanha=${conversa.campanhaId}&com=${conversa.remetente}`);
  };

  if (carregando) {
    return <div className="painel-usuario">Carregando...</div>;
  }

  return (
    <div className="painel-usuario">
      <section className="painel-info">
        <div className="painel-topo">
          <div>
            <h2>Bem-vindo, {nomeUsuario}!</h2>
            <p>Email: {emailUsuario}</p>
            <p>Campanhas criadas: {campanhas.length}</p>
            <p>Conversas ativas: {conversas.length}</p>
            {notificacoesRecentes.length > 0 && (
              <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                🔔 {notificacoesRecentes.length} nova(s) mensagem(ns)
              </p>
            )}
          </div>
          <button className="btn-logout" onClick={handleLogout} title="Sair da conta">
            Sair
          </button>
        </div>
      </section>

      {notificacoesRecentes.length > 0 && (
        <section className="notificacoes">
          <h3>🔔 Novas mensagens</h3>
          {notificacoesRecentes.map((msg, i) => (
            <div key={`${msg.campanhaId}-${msg.remetente}`} className="card-notificacao">
              <p>
                <strong>{nomesUsuarios[msg.remetente] || msg.remetente}</strong>: {msg.conteudo}
              </p>
              <p><small>{new Date(msg.dataEnvio).toLocaleString()}</small></p>
              <button onClick={() => responderMensagem(msg)}>
                Responder
              </button>
            </div>
          ))}
        </section>
      )}

      <section className="minhas-campanhas">
        <h3 onClick={() => setMostrarCampanhas(!mostrarCampanhas)} style={{ cursor: "pointer" }}>
          Minhas Campanhas {mostrarCampanhas ? "▲" : "▼"}
        </h3>
        {mostrarCampanhas && (
          <>
            {campanhas.length === 0 ? (
              <p>Você ainda não criou nenhuma campanha.</p>
            ) : (
              campanhas.map((c) => (
                <div key={c._id} className="card">
                  <h4>{c.titulo}</h4>
                  <p>{c.descricao}</p>
                </div>
              ))
            )}
          </>
        )}
      </section>

      <section className="historico-mensagens">
        <h3>Histórico de Conversas</h3>
        {conversas.length === 0 ? (
          <p>Você ainda não tem conversas.</p>
        ) : (
          conversas.map((conversa, i) => (
            <div key={`${conversa.campanhaId}-${conversa.remetente}`} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p><strong>Conversa com:</strong> {nomesUsuarios[conversa.remetente] || conversa.remetente}</p>
                  <p><small>Última mensagem: {conversa.ultimaMensagem}</small></p>
                  <p><small>{new Date(conversa.ultimaData).toLocaleString()}</small></p>
                </div>
                <button onClick={() => abrirConversa(conversa)}>
                  Abrir Chat
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default PainelUsuario;
