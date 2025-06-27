import mongoose from "mongoose";

const mensagemSchema = new mongoose.Schema(
  {
    campanhaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campanha",
      required: true,
    },
    remetente: {
      type: String,
      required: true,
    },
    destinatario: {
      type: String,
      required: true,
    },
    conteudo: {
      type: String,
      required: true,
    },
    dataEnvio: {
      type: Date,
      default: Date.now,
    },
    visualizada: {
      type: Boolean,
      default: false,
    }
  },
  {
    collection: "mensagens",
  }
);

export default mongoose.model("Mensagem", mensagemSchema);
