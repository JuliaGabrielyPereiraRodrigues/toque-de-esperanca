import { Schema, model } from "mongoose";

const campanhaSchema = new Schema({
  tipoCadastro: { type: String, required: true },
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  local: { type: String, required: true },
  tipo: { type: String, required: true },
  imagem: { type: String, required: true },
  status: { type: String, enum: ['ativa', 'concluida'], default: 'ativa' },
  criadoEm: { type: Date, default: Date.now },
});


const Campanha = model("Campanha", campanhaSchema);

export default Campanha;
