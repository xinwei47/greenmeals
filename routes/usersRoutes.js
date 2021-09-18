import express from "express";
import { renderRegister, registerUser, renderLogin, loginUser, logoutUser } from '../controllers/usersControllers.js';
import passport from 'passport';
import catchAsyncError from '../utilities/catchAsyncError.js';

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


export default router;