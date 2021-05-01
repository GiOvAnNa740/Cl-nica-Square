const mongoose = require("mongoose");

const agendaSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  data: { type: String, required: true },
  hora: { type: String, required: true },
  medico: { type: String, required: true },
  paciente: { type: String, required: true },
  espec: { type: String, required: true },
});

module.exports = mongoose.model("Agenda", agendaSchema);
