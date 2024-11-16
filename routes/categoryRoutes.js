// Importation des modules nécessaires
const express = require('express');

// Importation des contrôleurs pour gérer les catégories
const { createCategory } = require('../controllers/categoryController');

// Importation des middlewares pour l'authentification et la gestion des rôles
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Création d'un nouveau routeur Express
const router = express.Router();

// Route POST pour créer une nouvelle catégorie
// Cette route est protégée par les middlewares :
// - 'authMiddleware' pour vérifier si l'utilisateur est authentifié
// - 'roleMiddleware' pour vérifier si l'utilisateur a le rôle 'admin'
router.post('/', authMiddleware, roleMiddleware(['admin']), createCategory);

// Exportation du routeur pour l'utiliser dans l'application principale
module.exports = router;
