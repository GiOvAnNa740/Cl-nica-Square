require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require ('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");

const usuarioRoutes = require ('./rotas/usuarios');

app.use(cors());
app.use(express.json());
app.use("/imagens", express.static(path.join("backend/imagens")));

const Usuario = require("./models/usuario"); //mean-15
const Medico = require("./models/medico");
const { application } = require("express");

const userDB = process.env.MONGODB_USER;
const senhaDB = process.env.MONGODB_PASSWORD;
const clusterDB = process.env.CLUSTER;
const db = process.env.MONGODB_DATABASE;

//mongodb
mongoose
  .connect(
    "mongodb+srv://giovanna:Fiellhp.1910@cluster0.xlmeg.mongodb.net/projetodb?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });

//usuarios
app.use (usuarioRoutes);

app.use("/api/usuarios", (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    usuarios: usuarios,
  });
});

//medicos

app.post("/api/medicos", (req, res, next) => {
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

app.get("/api/medicos", (req, res, next) => {
  Medico.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      medicos: documents,
    });
  });
});

app.get("/api/medicos/:id", (req, res, next) => {
  Medico.findById(req.params.id).then((me) => {
    if (me) {
      res.status(200).json(me);
    } else res.status(404).json({ mensagem: "Medico não encontrado!" });
  });
});

app.delete("/api/medicos/:id", (req, res, next) => {
  console.log(req.params);
  res.status(200).end();
});

app.use("/api/medicos", (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    medicos: medicos,
  });
});

app.put("/api/medicos/:id", (req, res, next) => {
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

//agenda

app.post("/api/agendas", (req, res, next) => {
  const agenda = new Agenda({
    date: req.body.date,
    hora: req.body.hora,
    medico: req.body.medico,
    paciente: req.body.paciente,
    espec: req.body.espec,
  });
  agenda.save().then((agendaInserida) => {
    res.status(201).json({
      mensagem: "Consulta inserida",
      id: agendaInserida._id,
    });
  });
});

app.get("/api/agendas/", (req, res, next) => {
  Agenda.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      agendas: documents,
    });
  });
});

app.get("/api/agendas/:id", (req, res, next) => {
  Agenda.findById(req.params.id).then((ag) => {
    if (ag) {
      res.status(200).json(ag);
    } else res.status(404).json({ mensagem: "Consulta não encontrada!" });
  });
});

app.delete("/api/agendas/:id", (req, res, next) => {
  console.log(req.params);
  res.status(200).end();
});

app.use("/api/agendas", (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    agendas: agendas,
  });
});

app.put("/api/agendas/:id", (req, res, next) => {
  const agenda = new Agenda({
    _id: req.params.id,
    date: req.body.date,
    hora: req.body.hora,
    medico: req.body.medico,
    paciente: req.body.paciente,
    espec: req.body.espec,
  });
  Agenda.updateOne({ _id: req.params.id }, agenda).then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});

module.exports = app;
