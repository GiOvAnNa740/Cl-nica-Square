require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require ('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");

const usuarioRoutes = require ('./rotas/usuarios');
const medicoRoutes = require ('./rotas/medicos');
const agendaRoutes = require ('./rotas/agendas');

app.use(cors());
app.use(express.json());
//app.use("/imagens", express.static(path.join("backend/imagens")));

const Usuario = require("./models/usuario"); //mean-15
const Medico = require("./models/medico");
const Agenda = require("./models/agenda");
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

app.use (medicoRoutes);

app.use("/api/medicos", (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    medicos: medicos,
  });
});



//agenda

app.use (agendaRoutes);

app.use("/api/agendas", (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    agendas: agendas,
  });
});


module.exports = app;
