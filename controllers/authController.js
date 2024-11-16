// Import des modules nécessaires
const jwt = require('jsonwebtoken');  // Pour gérer les tokens JWT
const bcrypt = require('bcryptjs');    // Pour le hachage et la vérification de mots de passe
const User = require('../models/user'); // Modèle utilisateur pour les opérations CRUD avec la base de données
const config = require('../config');   // Fichier de configuration pour les variables globales (ex: secret JWT)

// Fonction pour enregistrer un nouvel utilisateur
exports.register = async (req, res) => {
  try {
    // Extraction des données de la requête
    const { username, password, role } = req.body;

    // Création d'un nouvel utilisateur avec les données fournies
    const user = new User({ username, password, role });

    // Sauvegarde de l'utilisateur dans la base de données
    await user.save();

    // Réponse de succès en cas d'enregistrement réussi
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // En cas d'erreur, envoie un message d'erreur avec le statut 500
    res.status(500).json({ message: error.message });
  }
};

// Fonction de connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    // Extraction du nom d'utilisateur et du mot de passe de la requête
    const { username, password } = req.body;

    // Recherche de l'utilisateur dans la base de données par nom d'utilisateur
    const user = await User.findOne({ username });

    // Vérification de l'existence de l'utilisateur et du mot de passe valide
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Génération d'un token JWT pour l'utilisateur authentifié
    const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret);

    // Réponse avec le token JWT pour permettre un accès protégé
    res.json({ token });
  } catch (error) {
    // En cas d'erreur, envoie un message d'erreur avec le statut 500
    res.status(500).json({ message: error.message });
  }
};
