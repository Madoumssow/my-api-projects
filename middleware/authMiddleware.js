// Importation de la bibliothèque jwt pour la vérification du token
const jwt = require('jsonwebtoken');

// Importation de la configuration contenant la clé secrète du JWT
const config = require('../config');

// Middleware pour vérifier l'authentification via JWT
const authMiddleware = (req, res, next) => {
  // Récupération du token depuis l'en-tête 'Authorization', en supprimant le préfixe 'Bearer '
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // Si le token n'est pas présent dans l'en-tête, renvoie une erreur 401 (non autorisé)
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    // Vérification du token avec la clé secrète définie dans la configuration
    const verified = jwt.verify(token, config.jwtSecret);
    
    // Si le token est valide, l'utilisateur est attaché à la requête pour un accès ultérieur
    req.user = verified;

    // Passer la requête à la fonction suivante du middleware ou au contrôleur
    next();
  } catch (error) {
    // Si le token est invalide ou expiré, renvoie une erreur 400 (mauvais token)
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// Exportation du middleware pour l'utiliser dans d'autres fichiers
module.exports = authMiddleware;
