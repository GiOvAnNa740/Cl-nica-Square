const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  hora: { type: String, required: true },
  medico: { type: String, required: true },
  paciente: { type: String, required: true },
  espec: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema);

