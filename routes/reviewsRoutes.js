import express from "express";
import { postReview, deleteReview } from '../controllers/reviewsControllers.js'
// import { isLoggedIn, isReviewAuthor } from '../middleware.js';
import catchAsyncError from '../utilities/catchAsyncError.js';

const router = express.Router({ mergeParams: true });


router.route('/')
    .post(catchAsyncError(postReview))

router.route('/:reviewId')
    .delete(catchAsyncError(deleteReview))

export default router;
