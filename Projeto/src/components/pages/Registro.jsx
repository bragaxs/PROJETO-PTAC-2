const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let usuarios = [
  { id: 1, nome: 'João', email: 'joao@example.com' },
  { id: 2, nome: 'Maria', email: 'maria@example.com' }
];

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  usuarios = usuarios.filter(usuario => usuario.id != id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
