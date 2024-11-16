// Import du modèle de produit
const Product = require('../models/product');

// Contrôleur pour créer un nouveau produit
exports.createProduct = async (req, res) => {
  try {
    // Création d'une nouvelle instance de produit avec les données envoyées dans la requête
    const product = new Product(req.body);

    // Sauvegarde du produit dans la base de données
    await product.save();

    // Réponse de succès avec le produit créé et le statut 201
    res.status(201).json(product);
  } catch (error) {
    // En cas d'erreur, envoie un message d'erreur avec le statut 500
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour obtenir tous les produits avec pagination et filtrage
exports.listProducts = async (req, res) => {
  try {
    // Paramètres de pagination et filtrage
    const { page = 1, limit = 10, category, priceMin, priceMax } = req.query;

    // Création de l'objet de filtrage
    const filter = {};
    if (category) filter.category = category;
    if (priceMin) filter.price = { ...filter.price, $gte: priceMin };
    if (priceMax) filter.price = { ...filter.price, $lte: priceMax };

    // Recherche des produits avec filtrage, pagination et tri
    const products = await Product.find(filter)
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    // Renvoi des produits filtrés et paginés
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour obtenir un produit par ID
exports.getProductById = async (req, res) => {
  try {
    // Recherche du produit par ID
    const product = await Product.findById(req.params.id);

    // Vérifie si le produit existe
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Réponse avec le produit trouvé
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour mettre à jour un produit par ID
exports.updateProduct = async (req, res) => {
  try {
    // Recherche et mise à jour du produit par ID avec les nouvelles données
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Vérifie si le produit existe
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Réponse avec le produit mis à jour
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour supprimer un produit par ID
exports.deleteProduct = async (req, res) => {
  try {
    // Recherche et suppression du produit par ID
    const product = await Product.findByIdAndDelete(req.params.id);

    // Vérifie si le produit existe
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Réponse de succès avec un message de confirmation de suppression
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
