import express from 'express';
import http from 'http';
import helmet from 'helmet';
import path from 'path';
import { dirname } from 'path';
import fs from 'fs';

// Initialisation de l'application
const app = express();

// Configuration de Helmet
app.use(helmet());

// Définition du chemin du dossier static
const __dirname = dirname(import.meta.url);
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// Routeur par défaut
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API RESTful!');
});

// Chargement des modules, routes, contrôleurs et modèles
import routes from './src/routes/index.js';
import * as controllers from './src/controllers/index.js';
import * as models from './src/models/index.js';

// Enregistrement des routes
app.use(routes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message);
});

// Création du serveur HTTP et lancement de l'application
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
