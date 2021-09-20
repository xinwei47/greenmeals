import Review from '../models/review.js'

// ******* using middleware ******* 
export const postReview = async (req, res) => {
    const recipeId = req.params.id;
    const review = new Review(req.body.review)
    review.recipeId = recipeId;
    review.author = req.user._id; // _id is created by mongoDB automatocally
    await review.save();
    req.flash('success', 'New review added!');
    res.redirect(`/recipes/${recipeId}`);
}

export const deleteReview = async (req, res) => {
    const { id: recipeId, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/recipes/${recipeId}`)
}

