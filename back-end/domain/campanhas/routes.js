import { Router } from "express";
import multer from "multer";
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
    const {
      tipoCadastro,
      titulo,
      descricao,
      local,
      tipo,
      meta,
      dataInicio,
      dataFim,
      contato,
      link,
      criador
    } = req.body;

    const imagem = req.file ? req.file.filename : null;

    if (!tipoCadastro || !titulo || !descricao || !local || !tipo || !imagem || !criador) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando." });
    }

    const novaCampanha = new Campanha({
      tipoCadastro,
      titulo,
      descricao,
      local,
      tipo,
      imagem,
      meta,
      dataInicio: dataInicio ? new Date(dataInicio) : undefined,
      dataFim: dataFim ? new Date(dataFim) : undefined,
      contato,
      link,
      criador,
    });

    await novaCampanha.save();

    res.status(201).json({
      mensagem: "Campanha criada com sucesso!",
      campanha: novaCampanha,
    });
  } catch (err) {
    console.error("Erro ao criar campanha:", err);
    res.status(500).json({ erro: "Erro ao criar campanha." });
  }
});

router.get("/", async (req, res) => {
  try {
    const { tipoCadastro, tipo, search, criador } = req.query;
    const filtro = {};

    if (tipoCadastro) filtro.tipoCadastro = tipoCadastro;
    if (tipo) filtro.tipo = tipo;
    if (criador) filtro.criador = criador;

    if (search) {
      filtro.$or = [
        { titulo: { $regex: search, $options: "i" } },
        { descricao: { $regex: search, $options: "i" } },
        { local: { $regex: search, $options: "i" } },
      ];
    }

    const campanhas = await Campanha.find(filtro).sort({ criadoEm: -1 });
    res.json(campanhas);
  } catch (err) {
    console.error("Erro ao buscar campanhas:", err);
    res.status(500).json({ erro: "Erro ao buscar campanhas." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const campanha = await Campanha.findById(req.params.id);
    if (!campanha) {
      return res.status(404).json({ erro: "Campanha não encontrada." });
    }
    res.json(campanha);
  } catch (err) {
    console.error("Erro ao buscar campanha por ID:", err);
    res.status(500).json({ erro: "Erro ao buscar campanha." });
  }
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

    res.json({
      mensagem: "Campanha marcada como concluída.",
      campanha,
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar campanha." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const campanha = await Campanha.findByIdAndDelete(req.params.id);
    if (!campanha) {
      return res.status(404).json({ erro: "Campanha não encontrada." });
    }
    res.json({ mensagem: "Campanha excluída com sucesso." });
  } catch (err) {
    console.error("Erro ao excluir campanha:", err);
    res.status(500).json({ erro: "Erro ao excluir campanha." });
  }
});

router.put("/:id", upload.single("imagem"), async (req, res) => {
  try {
    const {
      titulo,
      descricao,
      local,
      tipo,
      meta,
      dataInicio,
      dataFim,
      contato,
      link,
    } = req.body;

    const atualizacao = {
      titulo,
      descricao,
      local,
      tipo,
      meta,
      dataInicio: dataInicio ? new Date(dataInicio) : undefined,
      dataFim: dataFim ? new Date(dataFim) : undefined,
      contato,
      link,
    };

    if (req.file) {
      atualizacao.imagem = req.file.filename;
    }

    const campanha = await Campanha.findByIdAndUpdate(
      req.params.id,
      atualizacao,
      { new: true }
    );

    if (!campanha) {
      return res.status(404).json({ erro: "Campanha não encontrada." });
    }

    res.json({ mensagem: "Campanha atualizada com sucesso!", campanha });
  } catch (err) {
    console.error("Erro ao atualizar campanha:", err);
    res.status(500).json({ erro: "Erro ao atualizar campanha." });
  }
});


export default router;
