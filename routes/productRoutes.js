// Importation des modules nécessaires
const express = require('express');

// Importation de la fonction 'createProduct' depuis le contrôleur des produits
const { createProduct } = require('../controllers/productController');

// Importation des middlewares pour l'authentification et la gestion des rôles
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Création d'un nouveau routeur Express pour gérer les routes des produits
const router = express.Router();

// Route POST pour créer un nouveau produit
// Cette route est protégée par les middlewares :
// - 'authMiddleware' pour vérifier si l'utilisateur est authentifié
// - 'roleMiddleware' pour vérifier si l'utilisateur a le rôle 'admin'
router.post('/', authMiddleware, roleMiddleware(['admin']), createProduct);

// Exportation du routeur pour l'utiliser dans l'application principale
module.exports = router;
