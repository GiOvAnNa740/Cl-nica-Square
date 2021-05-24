const express = require("express");
const router = express.Router();
module.exports = router;
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//login
router.post("/login", (req, res, next) => {
  let user;
  Usuario.findOne({ email: req.body.email })
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
      res.status(200).json({ token: token });
    })
    .catch((err) => {
      return res.status(401).json({
        mensagem: "Login falhou: " + err,
      });
    });
});

//usuarios
router.post("/api/usuarios", (req, res, next) => {
  bcrypt.hash(req.body.senha, 10).then((hash) => {
    const usuario = new Usuario({
      nome: req.body.nome,
      sexo: req.body.sexo,
      dtnasc: req.body.dtnasc,
      email: req.body.email,
      fone: req.body.fone,
      cpf: req.body.cpf,
      senha: hash,
      senhaconf: req.body.senhaconf,
    });
    usuario
      .save()
      .then((usuarioInserido) => {
        res.status(201).json({
          mensagem: "Usuario criado",
          resultado: usuarioInserido._id,
        });
      })
      .catch((err) => {
        res.status(500).json({
          erro: err,
        });
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
