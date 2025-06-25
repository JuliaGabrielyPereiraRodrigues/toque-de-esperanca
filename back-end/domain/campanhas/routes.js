import { Router } from "express";
import multer from "multer";
import path from "path";
import Campanha from "./model.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    const { tipoCadastro, titulo, descricao, local, tipo } = req.body;
    const imagem = req.file ? req.file.filename : "";

    const campanha = new Campanha({
      tipoCadastro,
      titulo,
      descricao,
      local,
      tipo,
      imagem,
    });

    await campanha.save();
    res.status(201).json({ mensagem: "Campanha criada!", campanha });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar campanha." });
  }
});

router.get("/", async (req, res) => {
  const campanhas = await Campanha.find();
  res.json(campanhas);
});

router.patch("/:id/concluir", async (req, res) => {
  try {
    const { id } = req.params;
    const campanha = await Campanha.findByIdAndUpdate(
      id,
      { status: "concluida" },
      { new: true }
    );

    if (!campanha) {
      return res.status(404).json({ erro: "Campanha não encontrada." });
    }

    res.json({ mensagem: "Campanha marcada como concluída.", campanha });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar campanha." });
  }
});


export default router;
