import express from "express";
import { postReview, deleteReview } from '../controllers/reviewsControllers.js'
// import { isLoggedIn, isReviewAuthor } from '../middleware.js'

const router = express.Router({ mergeParams: true });


router.route('/')
    .post(postReview)

// router.post('/recipe/:id/reviews', postReview);

router.route('/:reviewId')
    .delete(deleteReview)

export default router;
