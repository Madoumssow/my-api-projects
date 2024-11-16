// Importation de mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définition du schéma pour la collection 'Product'
const productSchema = new mongoose.Schema({
  // Définition du champ 'name' pour le nom du produit
  name: { 
    type: String,       // Le type de données est une chaîne de caractères
    required: true      // Ce champ est obligatoire lors de la création du produit
  },

  // Définition du champ 'description' pour la description du produit (champ optionnel)
  description: String,  // Le type est une chaîne de caractères, ce champ est optionnel

  // Définition du champ 'price' pour le prix du produit
  price: { 
    type: Number,       // Le type de données est un nombre
    required: true      // Ce champ est obligatoire lors de la création du produit
  },

  // Définition du champ 'category' pour l'association avec une catégorie (référence à un document de la collection 'Category')
  category: { 
    type: mongoose.Schema.Types.ObjectId,  // Type de données ObjectId pour faire référence à un autre document
    ref: 'Category'                        // Référence au modèle 'Category', ce qui crée une relation entre 'Product' et 'Category'
  },
});

// Création et exportation du modèle 'Product' à partir du schéma défini
module.exports = mongoose.model('Product', productSchema);
