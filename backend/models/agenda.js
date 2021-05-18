const mongoose = require("mongoose");

const agendaSchema = mongoose.Schema({
  date: { type: String, required: true },
  hora: { type: String, required: true },
  medico: { type: String, required: true },
  paciente: { type: String, required: true },
  espec: { type: String, required: true },
});

module.exports = mongoose.model("Agenda", agendaSchema);

