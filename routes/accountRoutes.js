import express from "express";
import { getAccount, postFavorite, deleteFavorite } from '../controllers/accountControllers.js'
import catchAsyncError from '../utilities/catchAsyncError.js';

const router = express.Router();

router.route('/')
    .get(catchAsyncError(getAccount))

router.route('/favorites')
    .post(catchAsyncError(postFavorite))

router.route('/favorites/:id')
    .delete(catchAsyncError(deleteFavorite))


export default router;