const express = require("express");
const router = express.Router();
module.exports = router;
const Receita = require("../models/receita");


router.post("/api/receitas", (req, res, next) => {
    const receita = new Receita({
      paciente: req.body.paciente,
      categoria: req.body.categoria,
      texto: req.body.texto,
    });
    receita
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
