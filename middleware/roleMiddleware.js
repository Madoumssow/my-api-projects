// Middleware pour vérifier les rôles d'un utilisateur
const roleMiddleware = (roles) => (req, res, next) => {
    // Vérifie si le rôle de l'utilisateur est inclus dans la liste des rôles autorisés
    if (!roles.includes(req.user.role)) {
      // Si le rôle de l'utilisateur n'est pas autorisé, retourne un statut 403 (Accès interdit)
      return res.status(403).json({ message: 'Access Forbidden' });
    }
  
    // Si le rôle est valide, on passe à la prochaine fonction middleware ou au contrôleur
    next();
  };
  
  // Exportation du middleware pour l'utiliser dans d'autres fichiers
  module.exports = roleMiddleware;
  