require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/**
 * GET /
 * Homepage 
*/
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
    const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
    const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);

    const food = { latest, thai, american, chinese };

    res.render('index', { title: 'Cooking Blog - Home', categories, food });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
}

/**
 * GET /exploreCategories
 * Categories 
*/
exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 40;
    const categories = await Category.find({}).limit(limitNumber);

    res.render('categories', { title: 'Cooking Blog - Categories', categories });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
}

/**
 * GET /recipe/:id
 * Recipe 
*/
exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'Cooking Blog - Recipe', recipe });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
}

/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 50;
    const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Cooking Blog - Categories', categoryById });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
}
/**
 * POST /search
 * Search 
*/
exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Cooking Blog - Search', recipe });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }

}

/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Cooking Blog - Explore Latest', recipe });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
} 