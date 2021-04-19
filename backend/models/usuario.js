const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
  nome: { type: String, required: true },
  sexo: { type: String, required: true },
  dtnasc: { type: String, required: true },
  email: { type: String, required: true },
  fone: { type: String, required: true },
  cpf: { type: String, required: true },
  senha: { type: String, required: true },
  senhaconf: { type: String, required: true },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
