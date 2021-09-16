import dotenv from 'dotenv';
import axios from 'axios';

import Review from '../models/review.js'
dotenv.config();
const apiKey = process.env.API_KEY;

// search recipe results
export const fetchResults = async (req, res) => {
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
    res.render('recipes/results', { searchResults });
}


export const fetchRecipe = async (req, res) => {
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
    const reviews = await Review.find({ recipeId }).populate({ path: 'author' })
    res.render('recipes/recipe', { recipe, taste, nutrition, reviews })
}

