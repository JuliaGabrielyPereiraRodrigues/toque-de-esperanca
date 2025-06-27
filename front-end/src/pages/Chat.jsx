import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Chat.css";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const campanhaId = searchParams.get("campanha");
  const outroUsuario = searchParams.get("com");

  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [nomeOutroUsuario, setNomeOutroUsuario] = useState("");

  const emailUsuario = localStorage.getItem("emailUsuario");
  const nomeUsuario = localStorage.getItem("nomeUsuario");

  useEffect(() => {
    if (!campanhaId || !outroUsuario) {
      setErro("Informações do chat incompletas.");
      return;
    }

    carregarMensagens();
    buscarNomeOutroUsuario();
  }, [campanhaId, outroUsuario]);

  const buscarNomeOutroUsuario = async () => {
    try {
      const res = await fetch(`http://localhost:3000/usuarios/email/${outroUsuario}`);
      const data = await res.json();
      setNomeOutroUsuario(data.nome || outroUsuario);
    } catch {
      setNomeOutroUsuario(outroUsuario);
    }
  };

  const carregarMensagens = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/chat/conversa?campanhaId=${campanhaId}&usuario1=${emailUsuario}&usuario2=${outroUsuario}`
      );
      const data = await res.json();
      setMensagens(data);
    } catch (error) {
      setErro("Erro ao carregar mensagens.");
    }
  };

  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;

    try {
      await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campanhaId,
          remetente: emailUsuario,
          destinatario: outroUsuario,
          conteudo: novaMensagem,
        }),
      });

      setNovaMensagem("");
      carregarMensagens();
    } catch {
      setErro("Erro ao enviar mensagem.");
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat com {nomeOutroUsuario || "usuário desconhecido"}</h2>

      <div className="mensagens-box">
        {mensagens.map((msg, i) => (
          <div
            key={i}
            className={msg.remetente === emailUsuario ? "mensagem-enviada" : "mensagem-recebida"}
          >
            <p>
              <strong>{msg.remetente === emailUsuario ? "Você" : nomeOutroUsuario}:</strong>{" "}
              {msg.conteudo}
            </p>
          </div>
        ))}
      </div>

      <div className="form-chat">
        <input
          type="text"
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={enviarMensagem}>Enviar</button>
      </div>

      {erro && <p className="erro">{erro}</p>}
    </div>
  );
};

export default Chat;
