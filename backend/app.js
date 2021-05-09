const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

const Usuario = require("./models/usuario"); //mean-15
const Medico = require("./models/medico")

const userDB = process.env.MONGODB_USER;
const senhaDB = process.env.MONGODB_PASSWORD;
const clusterDB = process.env.CLUSTER;
const db = process.env.MONGODB_DATABASE;


//mongodb
mongoose
  .connect("mongodb+srv://giovanna:Fiellhp.1910@cluster0.xlmeg.mongodb.net/projetodb?retryWrites=true&w=majority")
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });

  //usuarios

app.post("/api/usuarios", (req, res, next) => {
  const usuario = new Usuario({
    nome: req.body.nome,
    sexo: req.body.sexo,
    dtnasc: req.body.dtnasc,
    email: req.body.email,
    fone: req.body.fone,
    cpf: req.body.cpf,
    senha: req.body.senha,
    senhaconf: req.body.senhaconf,
  });
  usuario.save();
  console.log(usuario);
  res.status(201).json({ mensagem: "Usuario inserido" });
});

app.get("/api/usuarios", (req, res, next) => {
  Usuario.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      usuarios: documents,
    });
  });
});

app.delete("/api/usuarios/:id", (req, res, next) => {
  console.log(req.params);
  res.status(200).end();
});

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
  medico.save();
  console.log(medico);
  res.status(201).json({ mensagem: "Medico inserido" });
});

app.get("/api/medicos", (req, res, next) => {
  Medico.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      medicos: documents,
    });
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

//agenda

app.post("/api/agendas", (req, res, next) => {
  const agenda = new Agenda({
    title: req.body.title,
    date: req.body.date,
    hora: req.body.hora,
    medico: req.body.medico,
    paciente: req.body.paciente,
    espec: req.body.espec,
  });
  agenda.save();
  console.log(agenda);
  res.status(201).json({ mensagem: "Consulta inserida" });
});

app.get("/api/agendas", (req, res, next) => {
  Agenda.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      agendas: documents,
    });
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

module.exports = app;
