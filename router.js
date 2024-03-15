const express = require("express");

const router = express.Router();

const produtos = [];

router.get("/produtos", function (req, res) {
  res.json(produtos);
});

router.get("/produtos/:produtoId", function (req, res) {
  const encontrado = produtos.find((item) => item.id == req.params.produtoId);
  if (!encontrado) {
    res.status(404).json({ msg: "Produto não encontrado" });
    return;
  }

  res.json({});
});

router.post("/produtos", function (req, res) {
  if (!req.body || !req.body.nome || !req.body.preco) {
    res.status(422).json({ msg: "Nome e/ou preco do produto obrigatorios" });
    return;
  }

  const novo = {
    id: produtos.length + 1,
    nome: req.body.nome,
    preco: req.body.preco,
  };

  produtos.push(novo);

  res.status(201).json({});
});

router.put("/produtos/:produtoId", function (req, res) {
  const encontrado = produtos.find((item) => item.id == req.params.produtoId);
  if (!encontrado) {
    res.status(404).json({ msg: "Produto não encontrado" });
    return;
  }
  encontrado.nome = req.body.nome;
  encontrado.preco = req.body.preco;

  res.json({});
});

router.delete("/produtos/:produtoId", function (req, res) {
  const posicao = produtos.findIndex(item => item.id == req.params.produtoId);
  if (posicao < 0) {
    res.status(404).json({ msg: "Produto não encontrado" });
    return;
  }
  produtos.splice(posicao, 1);

  res.status(204).end();
});

module.exports = router;
