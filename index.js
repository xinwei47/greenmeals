import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';

import connectDB from './config/mongodb.js';
import loginScreen from './views/users/login.js';
import registerScreen from './views/users/register.js';
import User from './models/users.js';

const app = express();

dotenv.config();
connectDB();

app.use(express.urlencoded({ extended: true })); // parse req.body
app.use(session());
app.use(flash());

// set up passport
app.use(passport.initialize()); // 'passport.initializer()' middleware is required to initialize passport in an Express-based app
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()) // 'serialization' tells how to store the data in a session
passport.deserializeUser(User.deserializeUser()) // 'deserialization' tells how to un-store the data in a session

// homepage
app.get('/', (req, res) => {
    res.send('Welcome to GreenMeals')
})

// render register page
app.get('/register', async (req, res) => {
    res.send(registerScreen());
})

// register user
// 'register(user, password, cb)' is a statics method added by password-local-mongoose.
// It helps to register a new user instance by hashed a given password and also check if username is unique.
// It also saves data to Mongo automatically.

app.post('/register', async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, password, confirmPassword } = req.body;
        const user = new User({ username, email });
        if (password === confirmPassword) {
            const registerUser = await User.register(user, password)
            req.login(registerUser, err => {
                res.send('register successfully');
                // res.redirect('/');
            })
        } else {
            res.send('Password do not match. Please try again.')
            // res.redirect('/register');
        }

    } catch (err) {
        console.log(err);
    }
})

// render login page
app.get('/login', (req, res) => {
    res.send(loginScreen());
})

// log user in
// passport.authenticate() is a passport built-in middleware, which compares the password entered with the stored one and login the user if the data matches
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {

    res.redirect('/');
})



app.listen(3000, () => {
    console.log('listening on port 3000');
})