const mongoose = require("mongoose");
const uniqueValidator = require ('mongoose-unique-validator');

const receitaSchema = mongoose.Schema({
  paciente: { type: String, required: true },
  categoria: { type: String, required: true },
  texto: { type: String, required: true },
});

receitaSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Receita", receitaSchema);
