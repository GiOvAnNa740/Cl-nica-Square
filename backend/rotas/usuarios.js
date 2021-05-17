const express = require('express');
const router = express.Router();
module.exports = router;
const Usuario = require('../models/usuario');


//usuarios

router.post("/api/usuarios", (req, res, next) => {
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
  usuario.save().then((usuarioInserido) => {
    res.status(201).json({
      mensagem: "Usuário inserido",
      id: usuarioInserido._id,
    });
  });
});

router.get("/api/usuarios", (req, res, next) => {
  Usuario.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      usuarios: documents,
    });
  });
});

router.get("/api/usuarios/:id", (req, res, next) => {
  Usuario.findById(req.params.id).then((us) => {
    if (us) {
      res.status(200).json(us);
    } else res.status(404).json({ mensagem: "Usuário não encontrado!" });
  });
});

router.delete("/api/usuarios/:id", (req, res, next) => {
  console.log(req.params);
  res.status(200).end();
});



router.put("/api/usuarios/:id", (req, res, next) => {
  const usuario = new Usuario({
    _id: req.params.id,
    nome: req.body.nome,
    sexo: req.body.sexo,
    dtnasc: req.body.dtnasc,
    email: req.body.email,
    fone: req.body.fone,
    cpf: req.body.cpf,
    senha: req.body.senha,
    senhaconf: req.body.senhaconf,
  });
  Usuario.updateOne({ _id: req.params.id }, usuario).then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});
