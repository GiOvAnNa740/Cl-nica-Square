const express = require('express');
const router = express.Router();
module.exports = router;
const Medico = require("../models/medico");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//login
router.post("/loginMedico", (req, res, next) => {
  let user;
  Medico.findOne({ email: req.body.email })
    .then((u) => {
      user = u;
      if (!u) {
        return res.status(401).json({
          mensagem: "email inválido",
        });
      }
      return bcrypt.compare(req.body.senha, u.senha);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          mensagem: "senha inválida",
        });
      }
      const token = jwt.sign(
        { email: user.email, id: user._id },
        "minhasenha",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        idUsuario: user._id
      });
    })
    .catch((err) => {
      return res.status(401).json({
        mensagem: "Login falhou: " + err,
      });
    });
});

router.post("/api/medicos", (req, res, next) => {
  bcrypt.hash(req.body.senha, 10).then((hash) => {
    const medico = new Medico({
      nome: req.body.nome,
      sexo: req.body.sexo,
      dtnasc: req.body.dtnasc,
      email: req.body.email,
      fone: req.body.fone,
      cpf: req.body.cpf,
      espec: req.body.espec,
      crm: req.body.crm,
      senha: hash,
      senhaconf: req.body.senhaconf,
    });
    medico
      .save()
      .then((medicoInserido) => {
        res.status(201).json({
          mensagem: "Medico inserido",
          resultado: medicoInserido._id,
        });
      })
      .catch((err) => {
        res.status(500).json({
          erro: err,
        });
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
