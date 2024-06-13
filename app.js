import express from "express";
import http from "http";
import helmet from "helmet";
import path from "path";
import { dirname } from "path";

//Import routes
import guestsRoutes from "./src/routes/guestsRoutes.js";
import roomsRoutes from "./src/routes/roomsRoutes.js";
import reservationRoutes from "./src/routes/reservationsRoutes.js";
import debugRouter from './src/routes/debugRoutes.js';

//Import Middlewares
import rateLimiterMiddleware from "./src/middlewares/rateLimiterMiddleware.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";

// Initialisation de l'application
const app = express();

app.use(helmet());

// Définition du chemin du dossier static
const __dirname = dirname(import.meta.url);
const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

// Rate Limiter
app.use(rateLimiterMiddleware);

//Set new view path
app.set('views', path.join(__dirname, 'src/views'));

// Routeur par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon API RESTful!");
});

// Enregistrement des routes
app.use("/guests", guestsRoutes);
app.use("/rooms", roomsRoutes);
app.use("/reservation", reservationRoutes);
app.use('/api', debugRouter);

// Gestion des erreurs
app.use(errorMiddleware);

// Création du serveur HTTP et lancement de l'application
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
