import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
