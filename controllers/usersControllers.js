import User from '../models/user.js';
import Recipe from '../models/recipe.js';

// render register page
export const renderRegister = (req, res) => {
    res.render('users/register');
}

// register user
// 'register(user, password, cb)' is a statics method added by password-local-mongoose.
// It helps to register a new user instance by hashed a given password and also check if username is unique.
// It also saves data to Mongo automatically.

export const registerUser = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    const user = new User({ username, email });
    if (password === confirmPassword) {
        const registerUser = await User.register(user, password)
        req.login(registerUser, err => {
            req.flash('success', 'You have registered successfully.');
            res.redirect('/');
        })
    } else {
        req.flash('error', 'Password do not match. Please try again.')
        res.redirect('/register');
    }
}

// render login page
export const renderLogin = (req, res) => {
    res.render('users/login');
}

// log user in
export const loginUser = (req, res) => {
    req.flash('success', 'Welcome back');
    // where to place req.session.returnTo = req.originalUrl?
    // req.session.returnTo = req.originalUrl;
    // console.log(req.session.returnTo);
    const redirectUrl = req.session.returnTo || '/'
    delete req.session.returnTo; // remove the returnTo link from the 'session' object
    res.redirect(redirectUrl);
}

// log user out
export const logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/');
}

// get user account management page
export const getAcctMgmt = (req, res) => {
    const keyWordMgmt = req.url.split('/')[2];
    res.render('users/acctMgmt', { keyWordMgmt });
}

// get user favorites page
export const getFavorites = async (req, res, next) => {
    const keyWordFav = req.url.split('/')[2];
    const user = await User.findById(req.user._id).populate('recipes');
    const userFavoriteRecipes = user.recipes;
    res.render('users/acctFavorites', { userFavoriteRecipes, keyWordFav });
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

    res.redirect('/account/favorites')
}


export const deleteFavorite = async (req, res) => {
    const unfavRecipe = await Recipe.findById(req.params.id)
    await User.findByIdAndUpdate(req.user._id, { $pull: { recipes: unfavRecipe._id } })
    res.redirect('/account/favorites')
}


export const updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const { originalPassword, newPassword, confirmNewPassword } = req.body;
    if (newPassword === confirmNewPassword) {
        await user.changePassword(originalPassword, newPassword);
        req.flash('success', 'Password changed successfully!')
    } else {
        req.flash('error', 'Password does not match!')
    }
    res.redirect('/account/management');
}

export const deleteUser = async (req, res, next) => {
    await User.findByIdAndDelete(req.user._id);
    req.flash('success', 'Account deleted successfully!')
    res.redirect('/');
}

