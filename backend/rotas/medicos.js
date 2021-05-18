const express = require('express');
const router = express.Router();
module.exports = router;

const Medico = require('../models/medico');


router.post("/api/medicos", (req, res, next) => {
  const medico = new Medico({
    nome: req.body.nome,
    sexo: req.body.sexo,
    dtnasc: req.body.dtnasc,
    email: req.body.email,
    fone: req.body.fone,
    cpf: req.body.cpf,
    espec: req.body.espec,
    crm: req.body.crm,
    senha: req.body.senha,
    senhaconf: req.body.senhaconf,
  });
  medico.save().then((medicoInserido) => {
    res.status(201).json({
      mensagem: "Médico inserido",
      id: medicoInserido._id,
    });
  });
});

router.get("/api/medicos", (req, res, next) => {
  Medico.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      medicos: documents,
    });
  });
});

router.get("/api/medicos/:id", (req, res, next) => {
  Medico.findById(req.params.id).then((me) => {
    if (me) {
      res.status(200).json(me);
    } else res.status(404).json({ mensagem: "Medico não encontrado!" });
  });
});

router.delete("/api/medicos/:id", (req, res, next) => {
  console.log(req.params);
  res.status(200).end();
});

router.put("/api/medicos/:id", (req, res, next) => {
  const medico = new Medico({
    _id: req.params.id,
    nome: req.body.nome,
    sexo: req.body.sexo,
    dtnasc: req.body.dtnasc,
    email: req.body.email,
    fone: req.body.fone,
    cpf: req.body.cpf,
    espec: req.body.espec,
    crm: req.body.crm,
    senha: req.body.senha,
    senhaconf: req.body.senhaconf,
  });
  Medico.updateOne({ _id: req.params.id }, medico).then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});
