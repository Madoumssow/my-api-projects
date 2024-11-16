// Importation des modules nécessaires
const express = require('express');         // Framework pour la gestion des routes
const mongoose = require('mongoose');       // Bibliothèque MongoDB pour Node.js (Mongoose)
const bodyParser = require('body-parser');  // Middleware pour parser le corps des requêtes
const config = require('./config');         // Fichier de configuration pour les variables globales (port, URI MongoDB, etc.)
const authRoutes = require('./routes/authRoutes');       // Routes pour l'authentification (inscription, connexion)
const productRoutes = require('./routes/productRoutes'); // Routes pour gérer les produits
const categoryRoutes = require('./routes/categoryRoutes'); // Routes pour gérer les catégories

// Création de l'application Express
const app = express();

// Middleware body-parser pour analyser les données JSON envoyées dans les requêtes
app.use(bodyParser.json());

// Connexion à MongoDB via Mongoose
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,      // Utilise le parser moderne pour les URL MongoDB
  useUnifiedTopology: true,  // Utilise le moteur de topologie unifiée de MongoDB pour de meilleures performances et fonctionnalités
})
  .then(() => console.log('MongoDB Connected'))  // Si la connexion est réussie, on affiche un message
  .catch((error) => console.log(error));        // Si la connexion échoue, on affiche l'erreur

// Définition des routes API
// Chaque route est liée à un groupe spécifique d'URLs pour la gestion des utilisateurs, des produits et des catégories
app.use('/api/auth', authRoutes);        // Route pour l'authentification (inscription, connexion)
app.use('/api/products', productRoutes); // Route pour gérer les produits
app.use('/api/categories', categoryRoutes); // Route pour gérer les catégories

// Lancement du serveur sur le port défini dans le fichier de configuration
app.listen(config.port, () => console.log(`Server running on port ${config.port}`)); // Affiche un message indiquant que le serveur fonctionne
