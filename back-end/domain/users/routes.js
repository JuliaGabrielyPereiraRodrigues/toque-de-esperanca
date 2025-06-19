import { Router } from "express";
import User from "./model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

router.get("/perfil", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.json({
      message: "Perfil do usuário carregado com sucesso.",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao carregar perfil.", error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      name,
      email,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (email) filter.email = new RegExp(email, "i");

    const users = await User.find(filter)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 });

    const totalUsers = await User.countDocuments(filter);

    res.json({
      page: Number(page),
      limit: Number(limit),
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuários", error: error.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, email, password, accountType } = req.body;

    if (!name || !email || !password || !accountType) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    if (!["ONG", "Doador"].includes(accountType)) {
      return res
        .status(400)
        .json({ message: "Tipo de conta inválido. Escolha ONG ou Doador." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      accountType,
    });
    await newUser.save();

    res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: { name, email, accountType },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login efetuado com sucesso.",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no login", error: error.message });
  }
});

export default router;
