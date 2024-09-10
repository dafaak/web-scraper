import express from 'express';
import axios from 'axios';
import { AppRoutes } from "./routes/routes"

const app = express();
const PORT = 3000;

app.use(AppRoutes.routes);



app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
