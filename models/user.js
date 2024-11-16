// Importation des modules nécessaires
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // bcrypt pour le hachage des mots de passe

// Définition du schéma pour la collection 'User'
const userSchema = new mongoose.Schema({
  // Définition du champ 'username' pour le nom d'utilisateur
  username: { 
    type: String,       // Le type de données est une chaîne de caractères
    required: true,     // Ce champ est obligatoire lors de la création d'un utilisateur
    unique: true        // Chaque nom d'utilisateur doit être unique
  },

  // Définition du champ 'password' pour le mot de passe de l'utilisateur
  password: { 
    type: String,       // Le type de données est une chaîne de caractères
    required: true      // Ce champ est obligatoire lors de la création d'un utilisateur
  },

  // Définition du champ 'role' pour le rôle de l'utilisateur
  // Par défaut, un utilisateur a le rôle 'user'. L'admin doit être spécifié explicitement
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Les seules valeurs autorisées pour ce champ sont 'user' et 'admin'
    default: 'user'         // Si le rôle n'est pas spécifié, il sera 'user' par défaut
  },
});

// Middleware 'pre' pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  // Si le mot de passe n'a pas été modifié, on n'a pas besoin de le hacher à nouveau
  if (!this.isModified('password')) return next();
  
  // Hachage du mot de passe avec bcrypt avant de le sauvegarder dans la base de données
  this.password = await bcrypt.hash(this.password, 10);  // Le '10' indique le nombre de rounds de hachage
  
  // Appel de la fonction `next()` pour poursuivre l'opération de sauvegarde
  next();
});

// Méthode pour vérifier si un mot de passe correspond au mot de passe haché dans la base de données
userSchema.methods.isValidPassword = async function (password) {
  // Comparaison du mot de passe passé en paramètre avec le mot de passe haché stocké
  return await bcrypt.compare(password, this.password);  // Renvoie true si les mots de passe correspondent
};

// Création et exportation du modèle 'User' à partir du schéma défini
module.exports = mongoose.model('User', userSchema);
