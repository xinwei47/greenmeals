import Review from './models/review.js';

// check if the user is logged in
export const isLoggedIn = (req, res, next) => {
    req.session.returnTo = req.originalUrl;
    if (!req.user) {
        req.flash('error', 'Please login first.');
        return res.redirect(`/login`);
    }
    next();
}

// check if the user is the review author 
export const isReviewAuthor = async (req, res, next) => {
    const { id: recipeId, reviewId } = req.params;
    const review = await Review.findById(reviewId).populate({ path: 'author' })
    if (!req.user.username === review.author.username) {
        req.flash('error', 'You are not authorized to do that.')
        return res.redirect(`/recipes/${recipeId}`)
    }
    next();
}


