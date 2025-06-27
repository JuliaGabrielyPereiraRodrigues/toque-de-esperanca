import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
  campanhaId: { type: mongoose.Schema.Types.ObjectId, ref: "Campanha", required: true },
  autor: { type: String, required: true },
  texto: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
});

const Comentario = mongoose.model("Comentario", comentarioSchema);

export default Comentario;
