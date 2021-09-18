import dotenv from 'dotenv';
import axios from 'axios';

import Review from '../models/review.js'
import User from '../models/user.js'
import Recipe from '../models/recipe.js'

dotenv.config();
const apiKey = process.env.API_KEY;

// search recipe results
export const fetchResults = async (req, res, next) => {
    const { searchString, searchIngredients, minFat, maxFat, minCalories, maxCalories, minCarbs, maxCarbs, minProtein, maxProtein } = req.body;
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
            apiKey,
            query: searchString,
            includeIngredients: searchIngredients,
            ...(minFat ? { minFat } : {}),
            ...(maxFat ? { maxFat } : {}),
            ...(minCalories ? { minCalories } : {}),
            ...(maxCalories ? { maxCalories } : {}),
            ...(minCarbs ? { minCarbs } : {}),
            ...(maxCarbs ? { maxCarbs } : {}),
            ...(minProtein ? { minProtein } : {}),
            ...(maxProtein ? { maxProtein } : {}),
            addRecipeNutrition: true,
            number: 21
        }
    })
    const searchResults = response.data.results;

    // pass favorite recipes to client if there are any
    let favRecipesIdArr;
    if (req.user) {
        // const user = await User.findById(req.user._id).populate({ path: 'Recipes' }); // not working
        const user = await User.findById(req.user._id).populate('recipes');
        favRecipesIdArr = user.recipes.map(recipe => recipe.recipeId);
    }
    // console.log(favRecipesIdArr);
    res.render('recipes/results', { searchResults, favRecipesIdArr });
}


export const fetchRecipe = async (req, res, next) => {
    const recipeId = req.params.id;
    const recipeResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
        params: { apiKey }
    })

    const tasteResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/tasteWidget`, {
        params: { apiKey }
    })

    const nutritionResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget`, {
        params: { apiKey, defaultCss: true }
    })

    const recipe = recipeResponse.data;
    const taste = tasteResponse.data;
    const nutrition = nutritionResponse.data;
    // find reviews if there are any in the database
    // Review.find() -> find all documents that recipeId matches
    // const reviews = await Review.find({ recipeId }).populate({ path: 'author' }) // working as well
    const reviews = await Review.find({ recipeId }).populate('author');
    res.render('recipes/recipe', { recipe, taste, nutrition, reviews })
}

