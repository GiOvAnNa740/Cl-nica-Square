const express = require("express");
const router = express.Router();
module.exports = router;

const Agenda = require("../models/agenda");

router.post("/api/agenda", (req, res, next) => {
  const agenda = new Agenda({
    date: req.body.date,
    hora: req.body.hora,
    medico: req.body.medico,
    paciente: req.body.paciente,
    espec: req.body.espec,
    link: req.body.link
  });
  agenda
      .save()
      .then((agendaInserida) => {
        res.status(201).json({
          mensagem: "Consulta agendada",
          resultado: agendaInserida._id,
        });
      })
      .catch((err) => {
        res.status(500).json({
          erro: err,
        });
      });
});

router.get("/api/agenda/", (req, res, next) => {
  Agenda.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      agendas: documents,
    });
  });
});

router.get("/api/agenda/:id", (req, res, next) => {
  Agenda.findById(req.params.id).then((ag) => {
    if (ag) {
      res.status(200).json(ag);
    } else res.status(404).json({ mensagem: "Consulta não encontrada!" });
  });
});

router.delete("/api/agenda/:id", (req, res, next) => {
  console.log(req.params);
  res.status(200).end();
});

router.put("/api/agenda/:id", (req, res, next) => {
  const agenda = new Agenda({
    _id: req.params.id,
    date: req.body.date,
    hora: req.body.hora,
    medico: req.body.medico,
    paciente: req.body.paciente,
    espec: req.body.espec,
    link: req.body.link
  });
  Agenda.updateOne({ _id: req.params.id }, agenda).then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});
