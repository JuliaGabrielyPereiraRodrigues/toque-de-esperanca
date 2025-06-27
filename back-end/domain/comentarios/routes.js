import { Router } from "express";
import Comentario from "./model.js";

const router = Router();

router.get("/:campanhaId", async (req, res) => {
  try {
    const comentarios = await Comentario.find({ campanhaId: req.params.campanhaId }).sort({ criadoEm: -1 });
    res.json(comentarios);
  } catch (err) {
    console.error("Erro ao buscar comentários:", err);
    res.status(500).json({ erro: "Erro ao buscar comentários." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { campanhaId, autor, texto } = req.body;

    if (!campanhaId || !autor || !texto) {
      return res.status(400).json({ erro: "Preencha todos os campos obrigatórios." });
    }

    const comentario = new Comentario({ campanhaId, autor, texto });
    await comentario.save();

    res.status(201).json(comentario);
  } catch (err) {
    console.error("Erro ao criar comentário:", err);
    res.status(500).json({ erro: "Erro ao criar comentário." });
  }
});

export default router;
