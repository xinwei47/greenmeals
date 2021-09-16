import express from "express";
import { fetchResults, fetchRecipe } from '../controllers/recipesControllers.js';
const router = express.Router();

router.route('/')
    .post(fetchResults);

router.route('/:id')
    .get(fetchRecipe)

export default router;