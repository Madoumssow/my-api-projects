// Charge les variables d'environnement définies dans le fichier .env
require('dotenv').config();

// Exportation des variables de configuration utilisées dans l'application
module.exports = {
  // Le port sur lequel le serveur écoute, défini par la variable d'environnement PORT ou 3000 par défaut
  port: process.env.PORT || 3000,

  // URI de la base de données MongoDB, qui est définie dans la variable d'environnement MONGODB_URI
  mongoUri: process.env.MONGODB_URI,

  // Clé secrète pour la gestion des JSON Web Tokens (JWT), définie dans la variable d'environnement JWT_SECRET
  jwtSecret: process.env.JWT_SECRET,
};
