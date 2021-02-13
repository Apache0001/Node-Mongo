const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// modelo
require("./src/models/Usuario");
const Usuario = mongoose.model("usuarios");
// Conexao com o banco
require("./src/db/connection");

app.use(express.json());

app.get("/", async (req, res) => {
  const usuarioResponse = await Usuario.find();
  const usuarioJson = await usuarioResponse;

  res.json(usuarioJson);
});

app.post("/usuarios", async (req, res) => {
  const validate = await Usuario.findOne({ email: req.body.email });
  if (validate) {
    return res.json({
      message: "Já existe um Usuario com este email.",
    });
  } else {
    const novoUsuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    });

    bcrypt.genSalt(10, (erro, salt) => {
      bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
        if (erro) {
          res.json({
            message: "Erro ao cadastrar o Usuario",
          });
        } else {
          novoUsuario.senha = hash;
          novoUsuario.save();
          res.json({
            message: "Usuario Cadastrado com sucesso!",
            usuario: novoUsuario,
          });
        }
      });
    });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findOne({ _id: id });

  usuario.nome = req.body.nome;
  usuario.email = req.body.email;
  usuario.senha = req.body.senha;

  usuario.save();

  res.json({ message: "Usuario Alterado" });
});

app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  await Usuario.findOneAndDelete({ _id: id });

  res.json({ message: "Usuario Deletado!" });
});

app.listen(3333);
