import express from "express";
import { renderRegister, registerUser, renderLogin, loginUser, logoutUser } from '../controllers/usersControllers.js';
import passport from 'passport';

const router = express.Router();

router.route('/register')
    .get(renderRegister)
    .post(registerUser)

router.route('/login')
    .get(renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), loginUser);

router.route('/logout')
    .get(logoutUser)


export default router;