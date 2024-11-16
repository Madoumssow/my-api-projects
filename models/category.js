// Importation de mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définition du schéma pour la collection 'Category'
const categorySchema = new mongoose.Schema({
  // Définition du champ 'name' pour le nom de la catégorie
  name: { 
    type: String,       // Le type de données est une chaîne de caractères
    required: true,     // Ce champ est requis (doit être fourni lors de la création de la catégorie)
    unique: true        // Chaque nom de catégorie doit être unique (pas de doublons)
  },
});

// Création et exportation du modèle 'Category' à partir du schéma défini
module.exports = mongoose.model('Category', categorySchema);
