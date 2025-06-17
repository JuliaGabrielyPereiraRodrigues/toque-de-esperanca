import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import UserRoutes from "./domain/users/routes.js";

const app = express();
const { PORT } = process.env;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(UserRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((err) => {
  console.error("Erro ao conectar ao banco:", err.message);
});