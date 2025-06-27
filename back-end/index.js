import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import connectDb from "./config/db.js";

import UserRoutes from "./domain/users/routes.js";
import campanhasRoutes from "./domain/campanhas/routes.js";
import comentariosRoutes from "./domain/comentarios/routes.js";
// import mensagemRoutes from "./domain/mensagem/routes.js"; 

const app = express();
const { PORT } = process.env;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

app.use(UserRoutes);
app.use("/campanhas", campanhasRoutes);
app.use("/comentarios", comentariosRoutes);
// app.use("/mensagens", mensagemRoutes); 

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao banco:", err.message);
  });

