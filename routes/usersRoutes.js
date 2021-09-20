import express from "express";
import passport from 'passport';
import { renderRegister, registerUser, renderLogin, loginUser, logoutUser, getFavorites, postFavorite, getAcctMgmt, deleteFavorite, updatePassword, deleteUser } from '../controllers/usersControllers.js';
import catchAsyncError from '../utilities/catchAsyncError.js';
import { isLoggedIn } from '../middleware.js';

const router = express.Router();

router.route('/register')
    .get(renderRegister)
    .post(catchAsyncError(registerUser))

router.route('/login')
    .get(renderLogin)
    // passport.authenticate() is a passport built-in middleware, which compares the password entered with the stored one and login the user if the data matches
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), loginUser);

router.route('/logout')
    .get(logoutUser)


// account routes
router.route('/account')
    .delete(isLoggedIn, catchAsyncError(deleteUser))

router.route('/account/favorites')
    .get(isLoggedIn, catchAsyncError(getFavorites))
    .post(isLoggedIn, catchAsyncError(postFavorite))

router.route('/account/management')
    .get(isLoggedIn, getAcctMgmt)

router.route('/account/favorites/:id')
    .delete(isLoggedIn, catchAsyncError(deleteFavorite))

router.route('/account/change-password')
    .put(isLoggedIn, catchAsyncError(updatePassword))

export default router;