const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

const Usuario = require("./models/usuario"); //mean-15

mongoose
  .connect("mongodb+srv://giovanna:Fiellhp.1910@cluster0.xlmeg.mongodb.net/projetodb?retryWrites=true&w=majority")
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });

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

module.exports = app;
