import express from 'express';
import { AppRoutes } from "./routes/routes"
import { envs } from "./config/envs";

var cors = require('cors')

const app = express();
app.use(cors());

const PORT = envs.port;

app.use(AppRoutes.routes);


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
