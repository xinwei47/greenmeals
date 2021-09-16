import Review from '../models/review.js'

export const postReview = async (req, res) => {
    const recipeId = req.params.id;
    if (req.user) {
        const review = new Review(req.body.review)
        review.recipeId = recipeId;
        review.author = req.user._id; // _id is created by mongoDB automatocally
        await review.save();
        req.flash('success', 'New review added!');
    } else {
        req.flash('error', 'Please login first.')
    }
    res.redirect(`/recipes/${recipeId}`);
}

export const deleteReview = async (req, res) => {
    const { id: recipeId, reviewId } = req.params;
    // verify is the user is login and user is the author
    const review = await Review.findById(reviewId).populate({ path: 'author' })
    if (req.user && req.user.username === review.author.username) {
        await Review.findByIdAndDelete(reviewId)
        req.flash('success', 'Successfully deleted review!')
    } else {
        req.flash('error', 'You are not authorized to do that.')
    }
    res.redirect(`/recipes/${recipeId}`)
}


// ******* using middleware ******* 
// export const postReview = async (req, res) => {
//     const recipeId = req.params.id;
//     const review = new Review(req.body.review)
//     review.recipeId = recipeId;
//     review.author = req.user._id; // _id is created by mongoDB automatocally
//     await review.save();
//     req.flash('success', 'New review added!');
//     res.redirect(`/recipes/${recipeId}`);
// }

// export const deleteReview = async (req, res) => {
//     const { id: recipeId, reviewId } = req.params;
//     await Review.findByIdAndDelete(reviewId)
//     req.flash('success', 'Successfully deleted review!')
//     res.redirect(`/recipes/${recipeId}`)
// }