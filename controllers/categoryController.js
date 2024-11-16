// Import du modèle de catégorie
const Category = require('../models/category');

// Contrôleur pour créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
  try {
    // Création d'une nouvelle instance de catégorie avec les données envoyées dans la requête
    const category = new Category(req.body);

    // Sauvegarde de la nouvelle catégorie dans la base de données
    await category.save();

    // Réponse de succès avec la catégorie créée et le statut 201
    res.status(201).json(category);
  } catch (error) {
    // En cas d'erreur, envoie un message d'erreur avec le statut 500
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour obtenir toutes les catégories
exports.getCategories = async (req, res) => {
  try {
    // Recherche de toutes les catégories dans la base de données
    const categories = await Category.find();

    // Réponse avec les catégories trouvées
    res.status(200).json(categories);
  } catch (error) {
    // En cas d'erreur, envoie un message d'erreur avec le statut 500
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour obtenir une catégorie par ID
exports.getCategoryById = async (req, res) => {
  try {
    // Recherche de la catégorie correspondant à l'ID spécifié
    const category = await Category.findById(req.params.id);

    // Vérifie si la catégorie existe
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Réponse avec la catégorie trouvée
    res.status(200).json(category);
  } catch (error) {
    // En cas d'erreur, envoie un message d'erreur avec le statut 500
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour mettre à jour une catégorie par ID
exports.updateCategory = async (req, res) => {
  try {
    // Recherche et mise à jour de la catégorie par ID avec les données de la requête
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Vérifie si la catégorie existe
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Réponse avec la catégorie mise à jour
    res.status(200).json(category);
  } catch (error) {
    // En cas d'erreur, envoie un message d'erreur avec le statut 500
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour supprimer une catégorie par ID
exports.deleteCategory = async (req, res) => {
  try {
    // Recherche et suppression de la catégorie par ID
    const category = await Category.findByIdAndDelete(req.params.id);

    // Vérifie si la catégorie existe
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Réponse de succès avec un message de confirmation de suppression
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    // En cas d'erreur, envoie un message d'erreur avec le statut 500
    res.status(500).json({ message: error.message });
  }
};
