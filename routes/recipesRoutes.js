import express from "express";
import { fetchResults, fetchRecipe } from '../controllers/recipesControllers.js';
import catchAsyncError from '../utilities/catchAsyncError.js'
const router = express.Router();

router.route('/')
    .post(catchAsyncError(fetchResults))

router.route('/:id')
    .get(catchAsyncError(fetchRecipe))

export default router;