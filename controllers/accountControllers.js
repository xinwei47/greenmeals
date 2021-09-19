import Recipe from '../models/recipe.js';
import User from '../models/user.js'

// get account page
export const getAccount = async (req, res) => {
    const user = await User.findById(req.user._id).populate('recipes');
    const userFavoriteRecipes = user.recipes;
    res.render('users/account', { userFavoriteRecipes });
}

// save favorite recipes
export const postFavorite = async (req, res, next) => {
    // save recipe information to MongoDB
    // display saved recipes as cards on user's account page
    const favRecipe = await new Recipe(req.query);
    const user = await User.findById(req.user._id).populate('recipes');
    user.recipes.push(favRecipe);

    await favRecipe.save();
    await user.save();

    res.redirect('/account')
}

export const deleteFavorite = async (req, res) => {
    const unfavRecipe = await Recipe.findById(req.params.id)
    await User.findByIdAndUpdate(req.user._id, { $pull: { recipes: unfavRecipe._id } })
    res.redirect('/account')
}