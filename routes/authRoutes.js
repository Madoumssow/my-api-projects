// Importation du module 'express' pour créer le routeur
const express = require('express');

// Importation des contrôleurs pour les actions d'enregistrement et de connexion
const { register, login } = require('../controllers/authController');

// Création d'un nouveau routeur Express
const router = express.Router();

// Route POST pour l'enregistrement d'un nouvel utilisateur
// Cette route appellera la méthode 'register' du contrôleur 'authController'
router.post('/register', register);

// Route POST pour la connexion d'un utilisateur
// Cette route appellera la méthode 'login' du contrôleur 'authController'
router.post('/login', login);

// Exportation du routeur pour pouvoir l'utiliser dans l'application principale
module.exports = router;
