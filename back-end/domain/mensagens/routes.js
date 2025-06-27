import { Router } from "express";
import Mensagem from "./model.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { campanhaId, remetente, destinatario, conteudo } = req.body;

    const novaMensagem = new Mensagem({
      campanhaId,
      remetente,
      destinatario,
      conteudo,
    });

    await novaMensagem.save();
    res.status(201).json(novaMensagem);
  } catch (err) {
    console.error("Erro ao salvar mensagem:", err);
    res.status(500).json({ erro: "Erro ao enviar mensagem" });
  }
});

router.get("/conversa", async (req, res) => {
  try {
    const { campanhaId, usuario1, usuario2 } = req.query;

    const mensagens = await Mensagem.find({
      campanhaId,
      $or: [
        { remetente: usuario1, destinatario: usuario2 },
        { remetente: usuario2, destinatario: usuario1 },
      ],
    }).sort({ dataEnvio: 1 });

    res.json(mensagens);
  } catch (err) {
    console.error("Erro ao buscar conversa:", err);
    res.status(500).json({ erro: "Erro ao buscar mensagens" });
  }
});

router.put("/marcar-como-lida/:id", async (req, res) => {
  try {
    await Mensagem.findByIdAndUpdate(req.params.id, { visualizada: true });
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao marcar mensagem como lida:", err);
    res.status(500).json({ erro: "Erro ao marcar como lida" });
  }
});

router.get("/notificacoes/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const mensagens = await Mensagem.aggregate([
      { $match: { destinatario: email, visualizada: false } },
      { $sort: { dataEnvio: -1 } },
      {
        $group: {
          _id: { campanhaId: "$campanhaId", remetente: "$remetente" },
          conteudo: { $first: "$conteudo" },
          dataEnvio: { $first: "$dataEnvio" },
          campanhaId: { $first: "$campanhaId" },
          remetente: { $first: "$remetente" },
          _idMensagem: { $first: "$_id" }
        }
      },
      { $sort: { dataEnvio: -1 } },
    ]);

    res.json(mensagens);
  } catch (err) {
    console.error("Erro ao buscar notificações:", err);
    res.status(500).json({ erro: "Erro ao buscar notificações" });
  }
});

export default router;
